/**
 * 定义日志的详细级别
 */
export const LogLevel = {
  // 级别 0：完全静默，不输出任何日志
  SILENT: 0,
  // 级别 1：只输出错误日志
  ERROR: 1,
  // 级别 2: 显示常规信息、警告以及更低级别的所有信息
  WARN: 2,
  // 级别 3: 显示所有信息，包括详细的调试日志
  DEBUG: 3,
} as const

export interface LoggingConfig {
  level: typeof LogLevel
}
