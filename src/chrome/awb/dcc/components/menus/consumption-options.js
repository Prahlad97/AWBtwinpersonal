import React, { useState, forwardRef } from 'react'
import {
  Radio,
  Button,
  Typography,
  Box,
  Divider,
} from '@material-ui/core'
import RadioCheckedIcon from '@/assets/images/radio-checked-icon.svg'
import RadioUnCheckedIcon from '@/assets/images/radio-unchecked-icon.svg'
import { useConsumptionOptionsMenuStyles } from './styles'

const ConsumptionOptionsMenu = forwardRef(
  ({ selected, onChange, onApply }, ref) => {
    const classes = useConsumptionOptionsMenuStyles()
    const [value, setValue] = useState(selected)

    const handleApply = () => {
      onChange(value)
      onApply()
    }

    return (
      <Box className={classes.root} ref={ref}>
        <Box
          className={`${classes.optionRow} ${
            value === 'TOTAL' ? classes.selectedOptionRow : ''
          }`}
        >
          <Radio
            value="TOTAL"
            checked={value === 'TOTAL'}
            onChange={() => setValue('TOTAL')}
            size="small"
            icon={
              <img
                src={RadioUnCheckedIcon}
                alt="unchecked"
                width={18}
                height={18}
              />
            }
            checkedIcon={
              <img
                src={RadioCheckedIcon}
                alt="checked"
                width={18}
                height={18}
              />
            }
          />
          <Box onClick={() => setValue('TOTAL')} className={classes.textBox}>
            <Typography
              className={`${classes.labelText} ${
                value === 'TOTAL' ? classes.labelTextSelected : ''
              }`}
            >
              Total Consumption
            </Typography>
            <Typography className={classes.subText}>
              Sum of demand or consumption for all users
            </Typography>
          </Box>
        </Box>

        <Box
          className={`${classes.optionRow} ${
            value === 'AVERAGE' ? classes.selectedOptionRow : ''
          }`}
          onClick={() => setValue('AVERAGE')}
        >
          <Radio
            value="AVERAGE"
            checked={value === 'AVERAGE'}
            onChange={() => setValue('AVERAGE')}
            size="small"
            icon={
              <img
                src={RadioUnCheckedIcon}
                alt="unchecked"
                width={18}
                height={18}
              />
            }
            checkedIcon={
              <img
                src={RadioCheckedIcon}
                alt="checked"
                width={18}
                height={18}
              />
            }
          />
          <Box className={classes.textBox}>
            <Typography
              className={`${classes.labelText} ${
                value === 'AVERAGE' ? classes.labelTextSelected : ''
              }`}
            >
              Average Consumption
            </Typography>
            <Typography className={classes.subText}>
              Average demand or consumption per user
            </Typography>
          </Box>
        </Box>

        <Divider />

        <Box mt={1} display="flex" justifyContent="flex-end">
          <Button className={classes.applyButton} onClick={handleApply}>
            Apply
          </Button>
        </Box>
      </Box>
    )
  },
)

export default ConsumptionOptionsMenu
