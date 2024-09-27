import fs from 'fs';
import path from 'path';

type Link = {
    path: string;
    name: string;
};

/**
 * Walks the filesystem tree starting at the given directory,
 * generating a list of links for SvelteKit pages.
 */
export function generateLinks(startDir: string) {
    const links: Link[] = [];

    function walk(dir: string) {
        const files = fs.readdirSync(dir);

        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                walk(filePath);
            } else if (file.endsWith('+page.svelte')) {
                // Construct the link path based on the file structure
                const relativePath = path.relative(startDir, filePath);
                const linkPath = relativePath.replace(/\+page.svelte$/, '');
                if (linkPath) {
                    let name = linkPath
                        .replaceAll('-', ' ')
                        .replaceAll('/', '');
                    name = name.charAt(0).toUpperCase() + name.slice(1);
                    links.push({
                        path: linkPath,
                        name,
                    });
                }
            }
        }
    }

    walk(startDir);
    return links;
}
