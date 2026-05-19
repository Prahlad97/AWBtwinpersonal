import React, { useState, useMemo } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  TextField,
  Typography,
  Chip,
  Tabs,
  Tab,
} from "@material-ui/core";
import FilterIcon from '@/assets/images/filter-icon.svg';
import SearchIcon from '@/assets/images/search-icon.svg';
import CheckedIcon from '@/assets/images/checkbox-checked-icon.svg';
import UnCheckedIcon from '@/assets/images/checkbox-unchecked-icon.svg';
import { useFilterPopoverStyles } from './styles';

const timeRanges = [
  "Last 7 days",
  "Last 30 days",
  "Last 6 months",
  "Last 1 year",
];

const FilterPopover = ({ creators, onApply }) => {
  const classes = useFilterPopoverStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCreators, setSelectedCreators] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("createdBy");
  const [selectedTimeRanges, setSelectedTimeRanges] = useState([]);

  const handleToggleCreator = (name) => {
    setSelectedCreators((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const handleToggleTimeRange = (range) => {
    setSelectedTimeRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const handleClearAll = () => {
    setSelectedCreators([]);
    setSelectedTimeRanges([]);
    setSearchText(""); // Clear search input as well
    onApply?.({ creators: [], timeRanges: [] });
  };

  const handleApply = () => {
    onApply?.({ creators: selectedCreators, timeRanges: selectedTimeRanges });
    setAnchorEl(null);
  };

  const filteredCreators = useMemo(() =>
    creators?.filter((name) =>
      name?.toLowerCase().includes(searchText?.trim()?.toLowerCase())
    ), [searchText, creators]);

  const open = Boolean(anchorEl);

  return (
    <>
      <img
        className={open ? classes.iconBackgroundActive : classes.iconBackground}
        src={FilterIcon}
        alt="FilterIcon"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        classes={{ paper: classes.popoverPaper }}
      >
        {open && (
          <>
            <Box className={classes.contentRow}>
              <Box className={classes.tabsContainer}>
                <Tabs
                  orientation="vertical"
                  value={activeTab}
                  onChange={(e, newValue) => setActiveTab(newValue)}
                  TabIndicatorProps={{ style: { display: "none" } }}
                >
                  <Tab
                    label={
                      <Box display="flex" alignItems="center" justifyContent="flex-start" width="100%">
                        <Typography variant="body2">Created by</Typography>
                        {selectedCreators.length > 0 && (
                          <Chip label={selectedCreators.length} size="small" className={classes.chip} />
                        )}
                      </Box>
                    }
                    value="createdBy"
                    classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                  />

                  <Tab
                    label={
                      <Box display="flex" alignItems="center" justifyContent="flex-start" width="100%">
                        <Typography variant="body2">Created on</Typography>
                        {selectedTimeRanges.length > 0 && (
                          <Chip label={selectedTimeRanges.length} size="small" className={classes.chip} />
                        )}
                      </Box>
                    }
                    value="createdOn"
                    classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                  />
                </Tabs>
              </Box>

              <Box className={classes.contentBox}>
                {activeTab === "createdBy" && (
                  <>
                    <TextField
                      placeholder="Search Creator"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value?.trimStart())}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <img src={SearchIcon} alt="Search" className={classes.svgIcon} />
                          </InputAdornment>
                        ),
                      }}
                      style={{ marginBottom: 8 }}
                    />
                    <List dense className={classes.list}>
                      {filteredCreators?.map((name) => (
                        <ListItem
                          key={name}
                          button
                          onClick={() => handleToggleCreator(name)}
                          className={selectedCreators.includes(name) ? classes.selectedItem : ""}
                        >
                          <ListItemIcon className={classes.listItemIcon}>
                            <Checkbox
                              edge="start"
                              checked={selectedCreators.includes(name)}
                              icon={<img src={UnCheckedIcon} alt="" className={classes.svgIcon} />}
                              checkedIcon={<img src={CheckedIcon} alt="" className={classes.svgIcon} />}
                              disableRipple
                            />
                          </ListItemIcon>
                          <ListItemText primary={name} />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}

                {activeTab === "createdOn" && (
                  <List dense className={classes.list}>
                    {timeRanges.map((range) => (
                      <ListItem key={range} button onClick={() => handleToggleTimeRange(range)} className={selectedTimeRanges.includes(range) ? classes.selectedItem : ""}>
                        <ListItemIcon className={classes.listItemIcon}>
                          <Checkbox
                            edge="start"
                            checked={selectedTimeRanges.includes(range)}
                            icon={<img src={UnCheckedIcon} alt="" className={classes.svgIcon} />}
                            checkedIcon={<img src={CheckedIcon} alt="" className={classes.svgIcon} />}
                            disableRipple
                          />
                        </ListItemIcon>
                        <ListItemText primary={range} />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            </Box>

            <Divider style={{ marginTop: 16 }} />
            <Box className={classes.clearApplyContainer}>
              <Button
                onClick={handleClearAll}
                variant="outlined"
                className={classes.cancelButton}
              >
                Clear All
              </Button>
              <Button
                variant="contained"
                disableElevation
                className={classes.saveButton}
                onClick={handleApply}
              >
                Apply
              </Button>
            </Box>
          </>
        )}
      </Popover>
    </>
  );
};

export default FilterPopover;