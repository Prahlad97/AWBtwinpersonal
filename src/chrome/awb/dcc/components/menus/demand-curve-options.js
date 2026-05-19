import React, { useState, forwardRef, useMemo } from 'react';
import { Radio, Button, Typography, Box, Divider } from '@material-ui/core';
import RadioCheckedIcon from '@/assets/images/radio-checked-icon.svg';
import RadioUnCheckedIcon from '@/assets/images/radio-unchecked-icon.svg';
import { DEMAND_CURVE_MENU_ITEMS } from '@/constants/demand-curve-constants';
import { BUTTON_TYPES, capitalize } from '../../utils/demand-curve-utils';
import { useDemandCurveOptionsMenuStyles } from './styles';

const DEFAULT_DURATION = 'MONTHLY';
const DEFAULT_DEMAND_CURVE_TYPE = 'USAGE_TIME';

const DemandCurveOptionsMenu = forwardRef(({ selected, onChange, onApply }, ref) => {
  const classes = useDemandCurveOptionsMenuStyles();

  const [demandCurve, setDemandCurve] = useState({
    duration: selected?.duration || DEFAULT_DURATION,
    demandCurveType: selected?.demandCurveType || DEFAULT_DEMAND_CURVE_TYPE,
    buttonType: selected?.buttonType || '',
  });

  // Memoize handlers to prevent unnecessary re-renders
  const handleApply = () => {
    onChange({
      duration: demandCurve.duration,
      demandCurveType: demandCurve.buttonType
        ? `${demandCurve.demandCurveType}_${demandCurve.buttonType.toUpperCase()}`
        : demandCurve.demandCurveType,
      buttonType: demandCurve.buttonType
    });
    onApply();
  };

  const handleOnChange = (id, curveType) => {
    setDemandCurve((prev) => {
      const selectedOption = DEMAND_CURVE_MENU_ITEMS.find((opt) => opt.id === id);
      let newButtonType = prev.buttonType;

      if (selectedOption?.showButtons) {
        // If switching to an option with buttons, default to 'avg' if no button type is currently selected
        newButtonType = prev.buttonType || 'avg';
      } else {
        newButtonType = '';
      }

      return { ...prev, duration: id, demandCurveType: curveType, buttonType: newButtonType };
    });
  };

  const handleButtonTypeChange = (e, type) => {
    e.stopPropagation();
    setDemandCurve((prev) => ({ ...prev, buttonType: type }));
  };

  // Memoize the menu items to avoid recreating on every render
  const menuItems = useMemo(
    () =>
      DEMAND_CURVE_MENU_ITEMS?.map(({ id, description, showButtons, curveType }) => ({
        id,
        description,
        showButtons,
        curveType,
        isSelected: demandCurve.duration === id,
      })),
    [demandCurve.duration]
  );

  return (
    <Box className={classes.root} ref={ref}>
      {menuItems?.map(({ id, description, showButtons, curveType, isSelected }) => (
        <Box
          key={id}
          className={`${classes.optionRow} ${isSelected ? classes.selectedOptionRow : ''}`}
        >
          <Radio
            value={id}
            checked={isSelected}
            onChange={() => handleOnChange(id, curveType)}
            size='small'
            icon={<img src={RadioUnCheckedIcon} alt='unchecked' width={18} height={18} />}
            checkedIcon={<img src={RadioCheckedIcon} alt='checked' width={18} height={18} />}
          />
          <Box onClick={() => handleOnChange(id, curveType)} className={classes.textBox}>
            <Typography
              className={`${classes.labelText} ${isSelected ? classes.labelTextSelected : ''}`}
            >
              {description}
            </Typography>
            {showButtons && isSelected && (
              <Box className={classes.nestedButtons}>
                {BUTTON_TYPES.map((type) => (
                  <Button
                    key={type}
                    onClick={(e) => handleButtonTypeChange(e, type)}
                    className={`${classes.nestedBtn} ${
                      demandCurve.buttonType === type ? 'selected' : ''
                    }`}
                  >
                    {capitalize(type)}
                  </Button>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      ))}

      <Divider />

      <Box mt={1} display='flex' justifyContent='flex-end'>
        <Button className={classes.applyButton} onClick={handleApply}>
          Apply
        </Button>
      </Box>
    </Box>
  );
});

export default DemandCurveOptionsMenu;
