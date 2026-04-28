/**
 * Preload script — minimal contextBridge for future extensibility.
 *
 * Currently exposes nothing to the renderer; all computation runs client-side.
 */

import { contextBridge } from 'electron'

// Intentionally empty — extend here for main-process features (logging, file I/O, IPC).
contextBridge.exposeInMainWorld('score68', {})
