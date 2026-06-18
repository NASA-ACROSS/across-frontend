/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { downloadJSON } from './downloadJSON';

const jsonPayload = {
    foo: 'bar',
};

const filename = 'test.json';

vi.spyOn(globalThis, 'URL');

describe('downloadJSON', () => {
    let mockLink: {
        href: string;
        download: string;
        click: () => void;
    };
    let mockURL: {
        createObjectURL: () => void;
        revokeObjectURL: () => void;
    };
    let mockBlob: () => void;

    beforeEach(() => {
        vi.clearAllMocks();

        mockLink = {
            href: '',
            download: '',
            click: vi.fn(),
        };

        const mockDocument = {
            createElement: vi.fn().mockReturnValue(mockLink),
            body: {
                appendChild: vi.fn(),
                removeChild: vi.fn(),
            },
        };

        vi.stubGlobal('document', mockDocument);

        mockURL = {
            createObjectURL: vi.fn(),
            revokeObjectURL: vi.fn(),
        };

        vi.stubGlobal('URL', mockURL);

        mockBlob = vi.fn().mockImplementation((content: string, options: { type: string }) => {
            return { content, options };
        });

        vi.stubGlobal('Blob', mockBlob);
    });

    it('should use provided download filename', () => {
        downloadJSON(jsonPayload, filename);

        expect(mockLink.download).toBe(filename);
    });

    it('should create download link', () => {
        downloadJSON(jsonPayload, filename);

        expect(mockURL.createObjectURL).toHaveBeenCalledTimes(1);
    });

    it('should click download link', () => {
        downloadJSON(jsonPayload, filename);

        expect(mockLink.click).toHaveBeenCalledTimes(1);
    });

    it('should clean up download link', () => {
        downloadJSON(jsonPayload, filename);

        expect(mockURL.revokeObjectURL).toHaveBeenCalledTimes(1);
    });
});
