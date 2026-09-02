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
    let mockBlob: any;

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

        // Svelte 5 migration: unrelated to Svelte itself, but surfaced by the same
        // dependency bump. Regenerating the lockfile moved vitest 1 -> 4, and vitest 4
        // mocks are no longer constructible when built from an arrow function. downloadJSON
        // calls `new Blob(...)`, so the arrow implementation threw
        // "(content, options) => {...} is not a constructor". A function expression is
        // constructible, so `new` works.
        mockBlob = vi.fn(function (content: string, options: { type: string }) {
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
