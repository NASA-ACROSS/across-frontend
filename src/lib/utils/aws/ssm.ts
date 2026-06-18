import { GetParameterCommand, PutParameterCommand, ParameterNotFound, ParameterType, SSMClient, type Parameter } from '@aws-sdk/client-ssm';
import { CONFIG } from '$config/config';

export type ParameterWithValue = Parameter & { Value: string };

type PutOptions = {
    type?: ParameterType;
    overwrite?: boolean;
};

class SSM {
    private client: SSMClient;

    constructor() {
        this.client = new SSMClient({
            profile: CONFIG.AWS_PROFILE,
            region: CONFIG.AWS_REGION,
        });
    }

    public async getParameter(name: string, withDecryption: boolean = true): Promise<ParameterWithValue> {
        let param: Parameter | undefined;

        try {
            const getCommand = new GetParameterCommand({
                Name: name,
                WithDecryption: withDecryption,
            });

            const response = await this.client.send(getCommand);

            param = response.Parameter;
        } catch (error: unknown) {
            if (error instanceof ParameterNotFound) {
                throw new Error(`Parameter ${name} not found in AWS Parameter Store`);
            }

            throw error;
        }

        if (param?.Value === undefined) {
            throw new Error(`Parameter ${name} has no value in AWS Parameter Store`);
        }

        return param as ParameterWithValue;
    }

    public async putParameter(
        name: string,
        value: string,
        { type, overwrite }: PutOptions = { type: 'String', overwrite: false }
    ): Promise<void> {
        const putCommand = new PutParameterCommand({
            Name: name,
            Value: value,
            Type: type,
            Overwrite: overwrite,
        });

        await this.client.send(putCommand);
    }
}

export const ssm = new SSM();
