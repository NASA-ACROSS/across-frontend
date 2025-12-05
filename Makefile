# Define env variables
ENV ?= local
RUNTIME_ENVS = local dev staging prod
BUILD_ENV ?= local
BUILD_ENVS = local action deploy
IS_BUILD_ENV_VALID := $(filter $(BUILD_ENV), $(BUILD_ENVS))

# Docker
TAG = $(shell git rev-parse --short HEAD)

# define directories
NODE_MODULES = node_modules

# Detect installed tools
IS_NODE_INSTALLED := $(shell command -v node || echo "")
IS_NPM_INSTALLED := $(shell command -v npm || echo "")

# The `ask` macro displays a prompt to the user, processes their input,
# and conditionally executes a command based on the response.
#
# Args:
#   1: The message to display to the user (e.g., a question).
#   2: The command to execute if the user responds with 'y' or 'Y'.
#   3: The message to display and exit if the user responds with 'n' or 'N'.
#
# Example usage:
#   $(call ask, "Installing dependency",echo "Installing dep..." && install,"Installation aborted.")
define ask
	echo "$(1) Are you sure? (y/n)"; \
	read choice; \
	if [ "$$choice" = "y" ] || [ "$$choice" = "Y" ]; then \
		$(2); \
	else \
		echo "$(3)"; \
		exit 0; \
	fi
endef

# Tasks
.PHONY: list_targets help install check_env install_deps test lint types mfa push build_deploy clean prune

list_targets: ### Internal command used for getting a list of commands for .PHONY
	@awk '/^[a-zA-Z_\-]+:/ {sub(/:/, ""); printf "%s ", $$1} END {print ""}' $(MAKEFILE_LIST)

help:
	@echo "Usage:\n    make \033[36m<target>\033[0m"
	@awk ' \
	BEGIN { \
		group = ""; \
	} \
	/^[#] Group:/ { \
		group = substr($$0, index($$0,$$3)); \
		print "\n" group " Commands:"; \
	} \
	/^[a-zA-Z_-]+:.*## / && !/###/ { \
		target = $$1; \
		description = substr($$0, index($$0, "##") + 3); \
		gsub(":", "", target); \
		printf "  \033[36m%-15s\033[0m %s\n", target, description \
	} \
	' $(MAKEFILE_LIST)

# Group: Deployment
push: ## Build, tag, and push an image to ECR
	@aws ecr get-login-password \
    	--region us-east-2 | \
    	docker login \
			--username AWS \
			--password-stdin 905418122838.dkr.ecr.us-east-2.amazonaws.com

	@$(MAKE) build_deploy TAG=$(TAG)

	@docker tag \
		frontend:$(TAG) \
		905418122838.dkr.ecr.us-east-2.amazonaws.com/frontend:$(TAG)

	@docker push 905418122838.dkr.ecr.us-east-2.amazonaws.com/frontend:$(TAG)

build_deploy: ## Build the container for deployment
	@DOCKER_BUILDKIT=1 docker build \
		-t frontend:$(TAG) \
		--no-cache \
		--platform linux/amd64 \
		--ssh default \
		--provenance false \
		--build-arg BUILD_ENV=deploy \
		--target deploy .


# Group: Cleaning
clean: ## Clean node_modules
	@rm -rf $(NODE_MODULES)
	@echo "Cleaned up environment."

prune: ## Prune docker images and containers
	@docker container prune
	@docker image prune