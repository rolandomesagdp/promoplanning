import { Component, Input } from '@angular/core';
import { LogService } from '@pp-core/logging/log-service';
import { ChartLableFormat } from './models/chart-lable-format.model';
import { IPPChart } from './models/pp-chart.model';

@Component({
	template: ''
})
export abstract class BaseChartComponent {
	@Input() chartPalette: string = "Material";
	@Input() chartDataSource: IPPChart;
	lableFormat: ChartLableFormat = { type: "fixedPoint", precision: 2 }

	constructor(public logger: LogService) { }

	abstract getPoint(e: any): any;

	abstract togglePointSelection(point: any): void;

	abstract customizeTooltip(pointInfo: any): any;

	onPointClick(e: any): void {
		this.logger.log('PpBaseChartComponent', 'onPointClick', 'point clicked--', e);
		let point = this.getPoint(e);
		this.togglePointSelection(point);
	}
}