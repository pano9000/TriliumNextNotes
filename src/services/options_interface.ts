import { KeyboardActionNames } from "./keyboard_actions_interface.js";

/**
 * A dictionary where the keys are the option keys (e.g. `theme`) and their corresponding values.
 */
export type OptionMap = Record<OptionNames, string>;

/**
 * For each keyboard action, there is a corresponding option which identifies the key combination defined by the user.
 */
type KeyboardShortcutsOptions<T extends KeyboardActionNames> = {
    [key in T as `keyboardShortcuts${Capitalize<key>}`]: string
};

export interface OptionDefinitions extends KeyboardShortcutsOptions<KeyboardActionNames> {
    "openNoteContexts": string;
    "lastDailyBackupDate": string;
    "lastWeeklyBackupDate": string;
    "lastMonthlyBackupDate": string;
    "dbVersion": string;
    "theme": string;
    "syncServerHost": string;
    "syncServerTimeout": string;
    "syncProxy": string;
    "mainFontFamily": string;
    "treeFontFamily": string;
    "detailFontFamily": string;
    "monospaceFontFamily": string;
    "spellCheckLanguageCode": string;
    "codeNotesMimeTypes": string;
    "headingStyle": string;
    "highlightsList": string;
    "customSearchEngineName": string;
    "customSearchEngineUrl": string;
    "locale": string;
    "codeBlockTheme": string;
    "textNoteEditorType": string;
    "layoutOrientation": string;
    "allowedHtmlTags": string;
    "documentId": string;
    "documentSecret": string;
    "passwordVerificationHash": string;
    "passwordVerificationSalt": string;
    "passwordDerivedKeySalt": string;
    "encryptedDataKey": string;

    "lastSyncedPull": number;
    "lastSyncedPush": number;
    "revisionSnapshotTimeInterval": number;
    "revisionSnapshotNumberLimit": number;
    "protectedSessionTimeout": number;
    "zoomFactor": number;
    "mainFontSize": number;
    "treeFontSize": number;
    "detailFontSize": number;
    "monospaceFontSize": number;
    "imageMaxWidthHeight": number;
    "imageJpegQuality": number;
    "leftPaneWidth": number;
    "rightPaneWidth": number;
    "eraseEntitiesAfterTimeInSeconds": number;
    "autoReadonlySizeText": number;
    "autoReadonlySizeCode": number;
    "maxContentWidth": number;
    "minTocHeadings": number;
    "eraseUnusedAttachmentsAfterSeconds": number;
    "firstDayOfWeek": number;

    "initialized": boolean;
    "overrideThemeFonts": boolean;
    "spellCheckEnabled": boolean;
    "autoFixConsistencyIssues": boolean;
    "vimKeymapEnabled": boolean;
    "codeLineWrapEnabled": boolean;
    "leftPaneVisible": boolean;
    "rightPaneVisible": boolean;
    "nativeTitleBarVisible": boolean;
    "hideArchivedNotes_main": boolean;
    "debugModeEnabled": boolean;
    "autoCollapseNoteTree": boolean;
    "dailyBackupEnabled": boolean;
    "weeklyBackupEnabled": boolean;
    "monthlyBackupEnabled": boolean;
    "compressImages": boolean;
    "downloadImagesAutomatically": boolean;
    "checkForUpdates": boolean;
    "disableTray": boolean;
    "promotedAttributesOpenInRibbon": boolean;
    "editedNotesOpenInRibbon": boolean;
    "codeBlockWordWrap": boolean;
    "textNoteEditorMultilineToolbar": boolean;
    "backgroundEffects": boolean;
};

export type OptionNames = keyof OptionDefinitions;

export type FilterOptionsByType<U> = {
    [K in keyof OptionDefinitions]: OptionDefinitions[K] extends U ? K : never;
}[keyof OptionDefinitions];