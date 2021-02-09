export interface SimpleFileStats {
    file: string;
    size: number;
}
export declare type SimpleFilesStats = SimpleFileStats[];
export interface SimpleReport {
    simpleFileStats: SimpleFilesStats;
    reportTimestamp: number;
}
export interface CompareFilesStats {
    sizeWas: number;
    sizeNew: number;
    file: string;
    folderName: string;
    sizeReadable: string;
    newSizeReadable: string;
    diffSize: number;
    bothFileExistDiff: number;
    order: number;
    diffReadable: string;
    isSizeDecreased: boolean;
}
export interface SimpleCompareFoldersStats {
    folderName: string;
    diffSize: number;
    sizeWas: number;
    sizeNew: number;
}
interface ReadableCompareFolderStats {
    sizeWas: string;
    sizeNew: string;
    diffSize: string;
}
export interface CompareFolderStats extends SimpleCompareFoldersStats {
    readable: ReadableCompareFolderStats;
    isSizeDecreased: boolean;
}
export interface CompareReport {
    fileStats: CompareFilesStats[];
    folderStats: CompareFolderStats[];
    leftReportTimestamp: number;
}
export {};
