export const DIALOG_MESSAGES = {
  CONFIRM_SAVE_SNAPSHOT: 'Snapshot has been saved successfully.',
  CONFIRM_SAVE_SEGMENT: 'Segment has been saved successfully.',
  CONFIRM_SHARE_SEGMENT: 'Segment has been shared successfully.',
  CONFIRM_SAVE_CHART: 'Chart has been saved successfully.',
  CONFIRM_SHARE_CHART: 'Chart has been shared successfully.',
  ERROR_MSG_REQUIRED: 'This field is required.',
  ERROR_MSG_SEGMENT_EXIST: 'The segment with this name already exist.',
  ERROR_MSG_SAVED_FILTER_EXIST: 'The Saved Filter with this name already exist.',
  ERROR_MSG_CHART_EXIST: 'The chart with this name already exist.',
  ERROR_MSG_SEGMENT_NAME: 'The segment name can have only alphanumeric and _ as characters',
  ERROR_MSG_SAVED_FILTER_NAME:
    'The Saved Filter name can have only alphanumeric and _ as characters',
  ERROR_MSG_CHART_NAME: 'The chart name can have only alphanumeric and _ as characters',
  ERROR_MSG_SAVING_SAVED_FILTER: 'Some error occured while saving the filters',
  ERROR_MSG_SHARING_SAVED_FILTER: 'Some error occured while sharing the SavedFilter',
  ERROR_MSG_RENAMING_SAVED_FILTER: 'Some error occured while renaming the Saved filters',
  ERROR_MSG_DELETING_SAVED_FILTER: 'Some error occured while deleting the Saved filters',
  ERROR_MSG_SAVING_SEGMENT_SNAPSHOT: 'Some error occured while saving the segment',
  ERROR_MSG_SHARING_SEGMENT_SNAPSHOT: 'Some error occured while sharing the segment',
  ERROR_MSG_RENAMING_SEGMENT_SNAPSHOT: 'Some error occured while renaming the segment',
  ERROR_MSG_DELETING_SEGMENT_SNAPSHOT: 'Some error occured while deleting the segment',
  ERROR_MSG_SAVING_CHART: 'Some error occured while saving the chart',
  ERROR_MSG_SHARING_CHART: 'Some error occured while sharing the chart',
  ERROR_MSG_RENAMING_CHART: 'Some error occured while renaming the chart',
  ERROR_MSG_DELETING_CHART: 'Some error occured while deleting the chart',
  SESSION_EXPIRED: 'Your session has expired. Please Re-login.',
  UNKNOWN_ERROR: 'Something went wrong. Please try again after sometime.',
  CONFIRM_DELETE_SEGMENT: 'Segment has been deleted successfully.',
  CONFIRM_DELETE_CHART: 'Chart has been deleted successfully.',
  CONFIRM_UPLOAD_SCENARIO: 'File has been Uploaded Succesfully',
  ERROR_VERSION_FILE_ALREADY_PRESENT:
    'File with given name is already present,try uploading a different file',
  ERROR_MSG_COMPARISON_NAME: 'The comparison name can have only alphanumeric and _ as characters',
  ERROR_MSG_COMPARISON_EXIST: 'The comparison with this name already exist.',
  ERROR_MSG_COMPARISON_MAX_LENGTH: 'Comparison name cannot exceed 256 characters',
};

export const DELETE_SEGMENT = {
  TITLE: 'Delete Segment',
  CONTENT: 'Are you sure you want to delete the following segment?',
  CONFIRM: 'Delete',
};

export const SHARE_SEGMENT = {
  TITLE: 'Share Segment across company',
  CONTENT: 'Sharing will give other users in your company access to this saved segment',
  CONFIRM: 'Share',
};

export const RENAME_SEGMENT = {
  TITLE: 'Rename',
  LABEL: 'Segment Name',
  CONFIRM: 'Save',
};

export const SAVE_SEGMENT = {
  UPLOAD_TITLE: 'Save accounts in file as segment',
  SAVE_TITLE: `Save <userCount> accounts as segment`,
  LABEL: 'Segment Name',
  SAVE_DESCRIPTION:
    'The list of users will be saved as a named customer segment you can quickly apply later.',
  UPLOAD_DESCRIPTION: 'The list of accounts in the uploaded file will be saved under this segment',
  CONFIRM: 'Save',
};

export const DELETE_FILTERS = {
  TITLE: 'Delete Saved Filter',
  CONTENT: 'Are you sure you want to delete the following saved filter?',
  CONFIRM: 'Delete',
};

export const SHARE_FILTERS = {
  TITLE: 'Share Saved Filter across company',
  CONTENT: 'Sharing will give other users in your company access to this saved segment',
  CONFIRM: 'Share',
};

export const RENAME_FILTERS = {
  TITLE: 'Rename',
  LABEL: 'Saved Filter Name',
  CONFIRM: 'Save',
};

export const SAVE_FILTERS = {
  TITLE: 'Save filters',
  LABEL: 'Saved Filter Name',
  DESCRIPTION: `The current set of filters- premise type, meter type, fuel type, date range and 
  <length> other will be saved under following filter name`,
  CONFIRM: 'Save',
};

export const CREATE_COMPARISON = {
  TITLE: 'Demand curve comparison',
  LABEL: 'Comparison Name',
  CONFIRM: 'Create',
  CROSS_ICON: true,
};

export const EDIT_COMPARISON = {
  TITLE: 'Rename',
  LABEL: 'Comparison Name',
  CONFIRM: 'Save',
  CROSS_ICON: true,
};

export const DELETE_COMPARISON = {
  TITLE: 'Delete Demand Curve Comparison',
  CONTENT: 'Are you sure you want to delete the following Curve?',
  CONFIRM: 'Delete',
};

export const SAVE_COMPARISON = {
  TITLE: 'Save Changes',
  CONTENT: 'Save all the changes you made to the demand curve comparison',
  CANCEL: "Don't save",
  CONFIRM: 'Save',
};

export const PUBLISH_COMPARISON = {
  TITLE: 'Publish demand curve comparison across company',
  CONTENT:
    'Publishing will give other users in your company access to this demand curve comparison',
  CONFIRM: 'Share',
};

export const DELETE_CHART = {
  TITLE: 'Delete Chart',
  CONTENT: 'Are you sure you want to delete the following chart upload?',
  CONFIRM: 'Delete',
};

export const SHARE_CHART = {
  TITLE: 'Publish chart upload across company',
  CONTENT: 'Publishing will give other users in your company access to this chart upload',
  CONFIRM: 'Share',
};

export const RENAME_CHART = {
  TITLE: 'Rename',
  LABEL: 'Chart Name',
  CONFIRM: 'Save',
};

export const SAVE_CHART = {
  TITLE: 'Uploaded',
  LABEL: 'Chart Upload Name',
  DESCRIPTION:
    'The list of accounts loaded on the dashboard will be saved under this chart upload name',
  CONFIRM: 'Save',
};

export const CONSUMPTION_SELECT_TOOLTIP = {
  TOTAL_W_SOLAR:
    'Combined energy consumption and solar generation of all users during the selected time period and applied filters.',
  AVG_W_SOLAR:
    'Per-user average energy consumption and solar generation during the selected time period and applied filters.',
  TOTAL_WO_SOLAR:
    'Combined energy usage of all users during the selected timeframe, based on applied filters.',
  AVG_WO_SOLAR:
    'Per-user average energy usage during the selected timeframe, based on applied filters.',
};

export const EDIT_SCENARIO = {
  TITLE: 'Rename',
  LABEL: 'Scenario name',
  CONFIRM: 'Save',
  CROSS_ICON: true,
};

export const EDIT_VERSION = {
  TITLE: 'Rename',
  LABEL: 'Saved Version Name',
  CONFIRM: 'Save',
  CROSS_ICON: true,
};

export const DELETE_SCENARIO = {
  TITLE: 'Delete Saved Scenario',
  CONTENT: 'Are you sure you want to delete the following saved scenario ?',
  CONFIRM: 'Delete',
  EXTRA_TEXT: 'Base Scenario',
};

export const DELETE_VERSION = {
  TITLE: 'Delete Saved Version',
  CONTENT: 'Are you sure you want to delete the following saved version?',
  CONFIRM: 'Delete',
  EXTRA_TEXT: 'Region Divide',
};

export const PUBLISH_SCENARIO = {
  TITLE: 'Publish scenario across company',
  CONTENT: 'Publishing will give other users in your company access to saved scenario',
  CONFIRM: 'Share',
  EXTRA_TEXT: 'Base Scenario',
};

export const PUBLISH_VERSION = {
  TITLE: 'Publish version across company',
  CONTENT: 'Publishing will give other users in your company access to this saved version',
  CONFIRM: 'Share',
  EXTRA_TEXT: 'Region Divide',
};
export const NEW_VERSION = {
  TITLE: 'New Version',
  LABEL: 'Version Name',
  CONFIRM: 'Create Version',
  CROSS_ICON: false,
};

export const EDIT_ZONE = {
  TITLE: 'Rename',
  LABEL: 'Saved Zone Name',
  CONFIRM: 'Save',
  CROSS_ICON: true,
};

export const DELETE_ZONE = {
  TITLE: 'Delete Saved Zone',
  CONTENT: 'Are you sure you want to delete the following saved zone?',
  CONFIRM: 'Delete',
};

export const PUBLISH_ZONE = {
  TITLE: 'Publish zone across company',
  CONTENT: 'Publishing will give other users in your company access to this saved zone',
  CONFIRM: 'Share',
};
