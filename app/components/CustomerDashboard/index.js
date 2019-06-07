/**
 *
 * CustomerDashboard
 *
 */

import React from 'react';

import Table from '@material-ui/core/Table';
import { Grid, Typography, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import Am4themesAnimated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(Am4themesAnimated);
class CustomerDashboard extends React.Component {
  state = {
    dataTable: [
      {
        id: 1,
        name: 'Minh Chiến',
        contract: 'Hợp đồng a',
        contractValue: '10.000.000',
      },
      {
        id: 2,
        name: 'Minh Chiến',
        contract: 'Hợp đồng a',
        contractValue: '10.000.000',
      },
      {
        id: 3,
        name: 'Minh Chiến',
        contract: 'Hợp đồng a',
        contractValue: '10.000.000',
      },
      {
        id: 4,
        name: 'Minh Chiến',
        contract: 'Hợp đồng a',
        contractValue: '10.000.000',
      },
      {
        id: 5,
        name: 'Minh Chiến',
        contract: 'Hợp đồng a',
        contractValue: '10.000.000',
      },
    ],
    dataTableTwo: [
      {
        id: 1,
        name: 'Minh Chiến',
        contractNumber: '2',
        contractValue: '10.000.000',
      },
      {
        id: 2,
        name: 'Minh Chiến',
        contractNumber: '2',
        contractValue: '10.000.000',
      },
      {
        id: 3,
        name: 'Minh Chiến',
        contractNumber: '2',
        contractValue: '10.000.000',
      },
      {
        id: 4,
        name: 'Minh Chiến',
        contractNumber: '2',
        contractValue: '10.000.000',
      },
      {
        id: 5,
        name: 'Minh Chiến',
        contractNumber: '2',
        contractValue: '10.000.000',
      },
    ],
  };

  componentDidMount() {
    const chart = am4core.create('chartdiv', am4charts.XYChart);

    chart.data = [
      {
        date: '2019-01-01',
        value: 23,
      },
      {
        date: '2019-02-01',
        value: 17,
      },
      {
        date: '2019-03-01',
        value: 15,
      },
      {
        date: '2019-04-01',
        value: 16,
      },
      {
        date: '2019-05-01',
        value: 18,
      },
      {
        date: '2019-06-01',
        value: 13,
      },
      {
        date: '2019-07-02',
        value: 22,
      },
      {
        date: '2019-08-03',
        value: 23,
      },
      {
        date: '2019-09-01',
        value: 38,
      },
      {
        date: '2019-10-01',
        value: 33,
      },
      {
        date: '2019-11-02',
        value: 26,
      },
      {
        date: '2019-12-03',
        value: 30,
      },
    ];

    chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd';

    // Thêm tiêu đề
    const title = chart.titles.create();
    title.text = 'SỐ LƯỢNG KHÁCH HÀNG';
    title.fontSize = 25;
    title.marginBottom = 30;
    title.fontWeight = 'bold';

    // Create axes
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = 'Số lượng khách hàng';
    // Create series
    const series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = 'value';
    series.dataFields.dateX = 'date';
    series.tooltipText = '{value}';
    series.strokeWidth = 2;
    series.minBulletDistance = 15;

    // Drop-shaped tooltips
    // series.tooltip.background.cornerRadius = 20;
    // series.tooltip.background.strokeOpacity = 0;
    // series.tooltip.pointerOrientation = 'vertical';
    // series.tooltip.label.minWidth = 40;
    // series.tooltip.label.minHeight = 40;
    // series.tooltip.label.textAlign = 'middle';
    // series.tooltip.label.textValign = 'middle';

    // Make bullets grow on hover
    const bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color('#fff');

    const bullethover = bullet.states.create('hover');
    bullethover.properties.scale = 1.3;

    // Make a panning cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = 'panXY';
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;

    // Create vertical scrollbar and place it before the value axis
    // chart.scrollbarY = new am4core.Scrollbar();
    // chart.scrollbarY.parent = chart.leftAxesContainer;
    // chart.scrollbarY.toBack();

    // Create a horizontal scrollbar with previe and place it underneath the date axis
    // chart.scrollbarX = new am4charts.XYChartScrollbar();
    // chart.scrollbarX.series.push(series);
    // chart.scrollbarX.parent = chart.bottomAxesContainer;

    this.chart = chart;

    // PIE CHART
    const pieChart = am4core.create('piechart', am4charts.PieChart);

    const pieTitle = pieChart.titles.create();
    pieTitle.text = 'NHÓM KHÁCH HÀNG';
    pieTitle.fontSize = 25;
    pieTitle.marginBottom = 30;
    pieTitle.fontWeight = 'bold';
    pieChart.data = [
      {
        country: 'Tiềm năng',
        litres: 165.8,
      },
      {
        country: 'Quan trọng',
        litres: 139.9,
      },
      {
        country: 'Cần chăm sóc',
        litres: 128.3,
      },
      {
        country: 'Thân thiết',
        litres: 99,
      },
      {
        country: 'Tiếp cận',
        litres: 60,
      },
      {
        country: 'Chưa xác định',
        litres: 50,
      },
    ];

    const pieSeries = pieChart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'litres';
    pieSeries.dataFields.category = 'country';
    pieSeries.slices.template.stroke = am4core.color('#fff');
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;
    pieChart.legend = new am4charts.Legend();

    // NGUỒN KHÁCH HÀNG

    const columnChart = am4core.create('columnchart', am4charts.XYChart);

    // Thanh kéo dãn
    // columnChart.scrollbarX = new am4core.Scrollbar();
    // Tiêu đề
    const columnTitle = columnChart.titles.create();
    columnTitle.text = 'NGUỒN KHÁCH HÀNG';
    columnTitle.fontSize = 25;
    columnTitle.marginBottom = 30;
    columnTitle.fontWeight = 'bold';

    // Add data
    columnChart.data = [
      {
        country: 'Google',
        visits: 1984,
      },
      {
        country: 'Facebook',
        visits: 1711,
      },
      {
        country: 'USA',
        visits: 1025,
      },
      {
        country: 'China',
        visits: 882,
      },
      {
        country: 'Japan',
        visits: 809,
      },
      {
        country: 'Germany',
        visits: 322,
      },
    ];

    // Create axes
    const categoryAxis = columnChart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'country';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = 'right';
    categoryAxis.renderer.labels.template.verticalCenter = 'middle';
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;

    const columnValueAxis = columnChart.yAxes.push(new am4charts.ValueAxis());
    columnValueAxis.renderer.minWidth = 50;

    // Create series
    const columnSeries = columnChart.series.push(new am4charts.ColumnSeries());
    columnSeries.sequencedInterpolation = true;
    columnSeries.dataFields.valueY = 'visits';
    columnSeries.dataFields.categoryX = 'country';
    columnSeries.tooltipText = '[{categoryX}: bold]{valueY}[/]';
    columnSeries.columns.template.strokeWidth = 0;

    columnSeries.tooltip.pointerOrientation = 'vertical';

    columnSeries.columns.template.column.cornerRadiusTopLeft = 10;
    columnSeries.columns.template.column.cornerRadiusTopRight = 10;
    columnSeries.columns.template.column.fillOpacity = 0.8;

    // on hover, make corner radiuses bigger
    const hoverState = columnSeries.columns.template.column.states.create('hover');
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    columnSeries.columns.template.adapter.add('fill', (fill, target) => columnChart.colors.getIndex(target.dataItem.index));

    // columnChart.legend = new am4charts.Legend();
    // Cursor
    columnChart.cursor = new am4charts.XYCursor();
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
    if (this.pieChart) {
      this.pieChart.dispose();
    }
    if (this.columnChart) {
      this.columnChart.dispose();
    }
  }

  render() {
    return (
      <Grid container>
        <Grid style={{ marginBottom: '90px' }} item md={12}>
          <div id="chartdiv" style={{ width: '100%', height: '500px' }} />
        </Grid>
        <Grid item md={6}>
          <div id="piechart" style={{ width: '100%', height: '500px' }} />
        </Grid>
        <Grid item md={6}>
          <div id="columnchart" style={{ width: '100%', height: '500px' }} />
        </Grid>
        <Grid style={{ marginTop: '20px' }} item md={6}>
          <Typography component="p" style={{ marginTop: 20, fontSize: '1.1rem', fontWeight: 'bold' }}>
            Top 10 khách hàng có giá trị hợp đồng lớn nhất
          </Typography>
          <Table style={{ width: '95%' }}>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Tên khách hàng</TableCell>
                <TableCell>Hợp đồng</TableCell>
                <TableCell>Giá trị hợp đồng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.dataTable.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.contract}</TableCell>
                  <TableCell>{row.contractValue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>

        <Grid style={{ marginTop: '20px' }} item md={6}>
          <Typography component="p" style={{ marginTop: 20, fontSize: '1.1rem', fontWeight: 'bold' }}>
            Top 10 đem lại doanh thu nhiều nhất
          </Typography>
          <Table style={{ width: '95%' }}>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Tên khách hàng</TableCell>
                <TableCell>Số lượng hợp đồng đã kí</TableCell>
                <TableCell>Tổng giá trị đã nhiệm thu</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.dataTableTwo.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.contractNumber}</TableCell>
                  <TableCell>{row.contractValue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    );
  }
}

export default CustomerDashboard;
