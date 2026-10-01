#!/data/data/com.termux/files/usr/bin/bash
# Kill lingering Next.js dev servers (matches launcher AND worker processes).
# Usage: bash scripts/kill-dev.sh
for pid in $(ls /proc | grep -E '^[0-9]+$'); do
  cmdline="$(tr '\0' ' ' < "/proc/$pid/cmdline" 2>/dev/null)"
  case "$cmdline" in
    *"bin/next"*|*"next-server"*|*"next/dist/bin/next"*)
      kill "$pid" 2>/dev/null && echo "killed $pid"
      ;;
  esac
done
echo "sweep-done"
