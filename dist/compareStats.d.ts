declare function folderNameFromPath(path: string): string;
declare function joinFileStatsToFolderStats(left: any, right: any): {
    [k: string]: unknown;
};
declare function getFileListFromBothReports(left: {
    file: string;
    size: number;
}[], right: {
    file: string;
    size: number;
}[]): string[];
declare function byFileNameReducer(memo: any, value: any): any;
declare function compareStats(left: any, right: any): {
    fileStats: {
        sizeWas: any;
        sizeNew: any;
        file: string;
        folderName: string;
        sizeReadable: any;
        newSizeReadable: any;
        diffSize: number;
        bothFileExistDiff: number;
        order: number;
        diffReadable: any;
        isSizeDecreased: boolean;
    }[];
    folderStats: any[];
};
