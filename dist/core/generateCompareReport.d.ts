import { CompareReport, SimpleReport } from './types';
export declare function generateCompareReport({ simpleFileStats: left, reportTimestamp: leftReportTimestamp }: SimpleReport, { simpleFileStats: right }: SimpleReport): CompareReport;
