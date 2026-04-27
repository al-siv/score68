/**
 * Preload script — minimal contextBridge for future extensibility.
 *
 * Currently exposes nothing to the renderer; all computation runs client-side.
 *
 * @since 2.0.0
 */

import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('score68', {})
