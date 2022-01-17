import { Promisable } from 'type-fest';

export interface IFilePreviewer {
    isSupporting(file: File): Promisable<boolean>;
    render(file: File): Promisable<JSX.Element>;
}
