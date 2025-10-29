/**
 * Z-Index Configuration for Vue Components
 *
 * This file defines a centralized z-index hierarchy for all components in the application.
 * It ensures proper layering of UI elements and prevents z-index conflicts.
 *
 * @fileoverview Z-index management system for consistent component layering
 * @author Vue Components Library
 * @version 1.0.0
 */

/**
 * Centralized z-index values for all components
 *
 * Z-index hierarchy (from highest to lowest):
 * 1. Teleported components (9999-9998) - Dropdowns, Selects, MultiSelects
 * 2. Modal components (999-998) - Modal dialogs and overlays
 * 3. Non-teleported components (50) - Regular positioned elements
 *
 * @constant {Object} Z_INDEX
 */
export const Z_INDEX = {
  /**
   * Teleported Components (High Z-Index)
   *
   * These components are teleported to document.body and need high z-index values
   * to appear above all other content. They use values in the 9998-9999 range.
   */

  /** Z-index for dropdown menu panel when teleported */
  DROPDOWN_MENU_PANEL: 9999,
  /** Z-index for dropdown menu overlay when teleported */
  DROPDOWN_MENU_OVERLAY: 9998,

  /** Z-index for select content panel when teleported */
  SELECT_CONTENT: 9999,
  /** Z-index for select overlay when teleported */
  SELECT_OVERLAY: 9998,

  /** Z-index for multi-select content panel when teleported */
  MULTI_SELECT_CONTENT: 9999,
  /** Z-index for multi-select overlay when teleported */
  MULTI_SELECT_OVERLAY: 9998,

  /**
   * Modal Layer
   *
   * Modal components use lower z-index values (998-999) to ensure they appear
   * above regular content but below teleported components.
   */

  /** Z-index for modal content container */
  MODAL_CONTENT: 999,
  /** Z-index for modal backdrop overlay */
  MODAL_OVERLAY: 998,

  /**
   * Non-Teleported Components
   *
   * These components are rendered in their normal position in the DOM tree
   * and use lower z-index values (50) for regular layering.
   *
   * @type {Object}
   */
  NON_TELEPORT: {
    /** Z-index for dropdown menu panel when not teleported */
    DROPDOWN_MENU_PANEL: 50,
    /** Z-index for select content when not teleported */
    SELECT_CONTENT: 50,
    /** Z-index for multi-select content when not teleported */
    MULTI_SELECT_CONTENT: 50,
  },
}
