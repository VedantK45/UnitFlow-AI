export interface APIRequest {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: Record<string, unknown>;
}

export interface TestResult {
  test_name: string;
  mutation: string;
  status_code: number;
  latency_ms: number;
  pass: boolean;
  reason: string;
}

export interface AnalysisSummary {
  total_tests: number;
  passed: number;
  failed: number;
  average_latency_ms: number;
  status_distribution: Record<string, number>;
  failure_reasons: Record<string, number>;
}

export interface Analysis {
  summary: AnalysisSummary;
  ai_report: string;
}

export interface RunTestsResponse {
  total_tests: number;
  passed: number;
  failed: number;
  average_latency: number;
  results: TestResult[];
  analysis: Analysis;
  pdf_report: string;
}