// src/components/ReportGenerator.jsx
import React, { useRef, useState, useEffect } from 'react'
import html2pdf from 'html2pdf.js'
import {
  Box,
  Typography,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
  Avatar,
  CircularProgress,
} from '@mui/material'
import { ExtensionContext as LookerSDKContext } from '@/providers/LookerExtensionMock.jsx'
import moment from 'moment'
import BidgelyLogo from '@/assets/images/bidgely-logo-dark.png'
import ProfileIcon from '@/assets/images/profile-icon.svg'
import CalendarIcon from '@/assets/images/calendar-icon.svg'
import { fetchComparison } from '../../services'
import { PROPERTIES } from '@/constants/demand-curve-constants'
import './report-print.css'

const ReportGenerator = ({ comparisonId }) => {
  const [showReport, setShowReport] = useState(true)
  const reportRef = useRef()
  const lookerSDK = React.useContext(LookerSDKContext)
  const extensionSDK = lookerSDK?.extensionSDK
  const [comparison, setComparison] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchComparison = async () => {
      setLoading(true)
      setError(null)
      try {
        const token = await extensionSDK.localStorageGetItem('access_token')
        const domain = await fetchComparison(comparisonId, token)
        setComparison(domain)
      } catch (err) {
        setError('Failed to load report data.')
      } finally {
        setLoading(false)
      }
    }
    if (extensionSDK && comparisonId) {
      fetchComparison()
    }
  }, [extensionSDK, comparisonId])

  // PDF generation effect

  const handleDownloadPDF = () => {
    const element = reportRef.current

    const reportTitle =
      comparison?.comparison?.name || 'Monthly Load Shape Comparison-2024'
    const opt = {
      margin: 0.5,
      filename: `${reportTitle}-Report.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    }
    html2pdf().set(opt).from(element).save()
  }

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    )
  }
  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    )
  }
  if (!comparison) return null

  const userName = comparison?.comparison?.userName || '—'
  const createdAt = comparison?.comparison?.createdAt
    ? moment
        .utc(Number(comparison.comparison.createdAt))
        .local()
        .format('MMMM D, YYYY')
    : '—'
  const reportTitle =
    comparison?.comparison?.name || 'Monthly Load Shape Comparison-2024'
  const reportDescription =
    comparison?.comparison?.description ||
    'Comparing average hourly demand on monthly for residential customers using AMI data. The goal is to identify shift patterns in evening peaks and evaluate if a new work-from-home trend is flattening the weekday curve. This insight helps inform time-of-use rate design updates.'
  const demandCurves = comparison?.demandCurves || []
  const deltaCurves = comparison?.deltaCurves || []

  // Delta curve detail text using new structure
  const deltaCurveDetailText = (deltaCurve) => {
    const curve1 = demandCurves.find(
      (curve) => curve.demandCurveId === deltaCurve.demandCurveId1,
    )
    const curve2 = demandCurves.find(
      (curve) => curve.demandCurveId === deltaCurve.demandCurveId2,
    )
    return `${curve1?.name || 'Curve 1'} - ${curve2?.name || 'Curve 2'}`
  }

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  // Mock filter/segment data for demonstration
  const mockFilters = [
    { label: 'Premise Type', value: 'Residential' },
    { label: 'Segment Type', value: 'High Loading' },
    { label: 'Fuel Type', value: 'Electricity' },
    { label: 'City', value: 'San Jose' },
    { label: 'User Status', value: 'Active' },
    { label: 'Home Type', value: 'Apartment, Bungalow' },
    { label: 'State', value: 'CA' },
  ]

  // Mock chart data (replace with real if available)
  const chartData = [
    [200, 150, 170, 180, 210, 220, 230, 240, 210, 200, 190, 180], // Demand Curve A
    [145, 140, 160, 170, 180, 200, 210, 220, 200, 190, 180, 160], // Demand Curve B
  ]

  // Mock table data (replace with real if available)
  const tableRows = months.map((month, i) => ({
    month,
    demandA: chartData[0][i] + ' kWh',
    demandB: chartData[1][i] + ' kWh',
  }))

  // Helper for curve details
  const renderCurveDetails = (curve, idx, isDelta = false) => (
    <Box key={curve.demandCurveId || curve.deltaCurveId || idx} mb={4}>
      <Box display="flex" alignItems="center" mb={2}>
        <img style={{ height: '40px' }} src={BidgelyLogo} alt="BidgelyLogo" />
      </Box>
      <Typography variant="h6" fontWeight={700} mb={1}>
        {`${idx + 1}. ${curve.name}`}
      </Typography>
      <Typography variant="body1" mb={2}>
        {isDelta
          ? `A delta curve is the absolute difference between two curves by calculating error between the values at each point.\n\nDelta Curve = ${deltaCurveDetailText(
              curve,
            )}`
          : `${curve.name} is defined by a combination of these key components:`}
      </Typography>
      {!isDelta && (
        <>
          <Typography variant="subtitle2" fontWeight={600} mb={0.5}>
            Time Interval:
          </Typography>
          <Typography variant="body2" mb={1}>
            {curve?.curveProperties?.[PROPERTIES.TIME_INTERVAL]}
          </Typography>
          <Typography variant="subtitle2" fontWeight={600} mb={0.5}>
            Segment:
          </Typography>
          <Typography variant="body2" mb={1}>
            {curve?.curveProperties?.[PROPERTIES.SEGMENT_SELECTION]?.segment_name ||
              curve?.curveProperties?.[PROPERTIES.SEGMENT_SELECTION]?.name}
          </Typography>
          <Typography variant="subtitle2" fontWeight={600} mb={0.5}>
            Filters:
          </Typography>
          <Box component="ul" sx={{ mb: 1 }}>
            {`Saved group filter ${
              curve?.curveProperties?.[PROPERTIES.SAVED_FILTER_SELECTION]?.name
            }`}
          </Box>
        </>
      )}
      {isDelta && (
        <Typography variant="body2" color="textSecondary" mb={1}>
          {`Delta Curve = ${deltaCurveDetailText(curve)}`}
        </Typography>
      )}
    </Box>
  )

  // Helper for chart legend
  const renderChartLegend = () => (
    <Box display="flex" alignItems="center" gap={2} mb={2}>
      <Box display="flex" alignItems="center" gap={1}>
        <Box sx={{ width: 16, height: 3, bgcolor: 'primary.main', mr: 1 }} />
        <Typography variant="body2">Demand Curve A</Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={1}>
        <Box sx={{ width: 16, height: 3, bgcolor: 'secondary.main', mr: 1 }} />
        <Typography variant="body2">Demand Curve B</Typography>
      </Box>
    </Box>
  )

  // Helper for chart placeholder
  const renderChart = () => (
    <Box mb={3}>
      {renderChartLegend()}
      <Box
        sx={{
          width: '100%',
          height: 180,
          bgcolor: '#f5f5f5',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#aaa',
          fontStyle: 'italic',
        }}
      >
        [Comparison Curve Chart Placeholder]
      </Box>
    </Box>
  )

  // Helper for table
  const renderTable = () => (
    <Box mt={3}>
      <Box
        sx={{
          width: '100%',
          overflowX: 'auto',
          bgcolor: '#fff',
          borderRadius: 2,
          border: '1px solid #B4D2F7',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: 8, border: '1px solid #B4D2F7' }}>Month</th>
              <th style={{ padding: 8, border: '1px solid #B4D2F7' }}>
                Demand Curve A
              </th>
              <th style={{ padding: 8, border: '1px solid #B4D2F7' }}>
                Demand Curve B
              </th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, i) => (
              <tr key={i}>
                <td style={{ padding: 8, border: '1px solid #B4D2F7' }}>
                  {row.month}
                </td>
                <td style={{ padding: 8, border: '1px solid #B4D2F7' }}>
                  {row.demandA}
                </td>
                <td style={{ padding: 8, border: '1px solid #B4D2F7' }}>
                  {row.demandB}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  )

  return (
    <>
      <div className="report-download-btn-row">
        <button className="report-download-btn" onClick={handleDownloadPDF}>
          Download Report
        </button>
      </div>
      {showReport && (
        <div className="report-root offscreen" ref={reportRef}>
          <img
            src={BidgelyLogo}
            alt="Bidgely Logo"
            className="report-logo report-logo-print"
          />
          <h2 className="report-section-title">
            Demand curve comparison Report
          </h2>
          <h1 className="report-title">{reportTitle}</h1>
          <div className="report-meta-row">
            <img src={ProfileIcon} className="report-avatar" alt="Profile" />
            <span className="report-meta-text">{userName}</span>
            <img
              src={CalendarIcon}
              alt="Calendar"
              className="report-calendar-icon"
            />
            <span className="report-meta-text">Created on {createdAt}</span>
          </div>
          <div className="report-description">{reportDescription}</div>
          <hr className="report-divider" />
          <h2 className="report-section-title">Comparison Parameter</h2>
          <h3 className="report-subtitle">Monthly Comparison Curve (kWh)</h3>
          <div className="report-body-text">
            Monthly Comparison Curve (kWh) is a visual representation of energy
            consumption trends across months, typically aggregated and
            normalized by kilowatt-hours (kWh). It is used to compare demand
            behavior across time, customer segments, programs, or geographies.
          </div>
          <h3 className="report-subtitle">Total Consumption (kWh)</h3>
          <div className="report-body-text">
            Total Consumption refers to the sum of all energy used by a
            customer, group of customers, or a segment over a specified period
            of time, measured in kilowatt-hours (kWh).
          </div>
          <hr className="report-divider" />
          <h2 className="report-section-title">Curves being Compared</h2>
          <div className="report-body-text">
            Here are the list of curves being compared
          </div>
          <ul className="report-curve-list">
            {demandCurves.map((curve, idx) => (
              <li
                key={curve.demandCurveId || idx}
                className="report-curve-item"
              >
                <span className="report-curve-name">{`${idx + 1}. ${
                  curve.name
                }`}</span>
              </li>
            ))}
            {deltaCurves.map((curve, idx) => (
              <li key={curve.deltaCurveId || idx} className="report-curve-item">
                <span className="report-curve-name">{`${
                  demandCurves.length + idx + 1
                }. ${curve.name}`}</span>
                <span className="report-curve-delta">
                  ({deltaCurveDetailText(curve)})
                </span>
              </li>
            ))}
          </ul>
          <hr className="report-divider" />
          {demandCurves.map((curve, idx) => (
            <React.Fragment key={curve.demandCurveId || idx}>
              {renderCurveDetails(curve, idx)}
              <hr className="report-divider" />
            </React.Fragment>
          ))}
          {deltaCurves.map((curve, idx) => (
            <React.Fragment key={curve.deltaCurveId || idx}>
              {renderCurveDetails(curve, demandCurves.length + idx, true)}
              <hr className="report-divider" />
            </React.Fragment>
          ))}
          <h2 className="report-section-title">Comparison Curve</h2>
          {renderChart()}
          {renderTable()}
        </div>
      )}
    </>
  )
}

export default ReportGenerator
