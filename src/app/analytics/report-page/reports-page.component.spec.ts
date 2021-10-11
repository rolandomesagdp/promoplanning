import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute, Router } from "@angular/router";
import { LogService } from "@pp-core/logging/log-service";
import { BackButtonComponent, BackButtonModule } from "@shared/components/back-button";
import { DrawerCardModule } from "@shared/components/drawer-card";
import { DrawerCardComponent } from "@shared/components/drawer-card/drawer-card.component";
import { PromoPlanningSpinnerModule, SpinnerComponent } from "@shared/components/spinner";
import { PpDevextremeModule } from "@shared/pp-devextreme";
import { of } from "rxjs";
import { AnalyticsService } from "../analytics-services";
import { BarChartComponent } from "../charts/bar-chart/bar-chart.component";
import { ChartHostDirective } from "../charts/chart-host.directive";
import { ChartWrapperComponent } from "../charts/chart-wrapper/chart-wrapper.component";
import { PieChartComponent } from "../charts/pie-chart/pie-chart.component";
import { FiltersManager } from "../../pp-filters/filters";
import { ReportPageFiltersComponent } from "../report-page-filters/report-page-filters.component";
import { ReportPageComponentSepSetup, RouteMock } from "./reports-page.component.specSetup";
import { ReportPageComponent } from "./reports-page.component";
import { ChartTypes } from "../charts/chart-wrapper/chart-types.enum";

describe('ReportPageComponent', () => {
    const setUp: ReportPageComponentSepSetup = new ReportPageComponentSepSetup();
    let routeMock, routerMock, analyticsServiceMock, loggerMock;
    let component: ReportPageComponent;
    let fixture: ComponentFixture<ReportPageComponent>;

    beforeEach(() => {
        routeMock = new RouteMock();
        analyticsServiceMock = jasmine.createSpyObj(["getChartsByPage", "getReportPageById"]);
        routerMock = jasmine.createSpyObj(["navigate"]);
        loggerMock = jasmine.createSpyObj(["debug"]);

        TestBed.configureTestingModule({
            declarations: [ 
                ReportPageComponent,
                ReportPageFiltersComponent,
                ChartWrapperComponent,
                ChartHostDirective,
                BarChartComponent, 
                PieChartComponent
            ],
            imports: [
                BrowserAnimationsModule,
                PpDevextremeModule,
                DrawerCardModule,
                BackButtonModule,
                PromoPlanningSpinnerModule,
                HttpClientTestingModule,
            ],
            providers: [
                FiltersManager,
                { provide: AnalyticsService, useValue: analyticsServiceMock },
                { provide: LogService, useValue: loggerMock },
                { provide: ActivatedRoute, useValue: routeMock },
                { provide: Router, useValue: routerMock }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ReportPageComponent);
        component = fixture.componentInstance;
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    describe("getChartContainerClass()", () => {
        it("should return 'full-width-chart-container' if is full screen chart", () => {
            // arrange
            const fullScreenChart = setUp.getFullScreenChart();

            // act
            const chartContainerClass = component.getChartContainerCssClass(fullScreenChart.printFullScreen);

            // assert
            expect(chartContainerClass).toEqual("full-width-chart-container");
        });

        it("should return 'half-width-chart-container' if is half screen chart", () => {
            // arrange
            const halfScreenChart = setUp.getHalfScreenChart();

            // act
            const chartContainerClass = component.getChartContainerCssClass(halfScreenChart.printFullScreen);

            // assert
            expect(chartContainerClass).toEqual("half-width-chart-container");
        });
    });

    describe("UI elements", () => {
        describe("Basic elements", () => {
            beforeEach(() => {
                analyticsServiceMock.getChartsByPage.and.returnValue(of(setUp.getPpChartsArray()));
                analyticsServiceMock.getReportPageById.and.returnValue(of(setUp.createInternalReportPage()));
            });
    
            it("should be wrapped in Promo Planning's Drawer Card.", () => {
                // arrange
                fixture = TestBed.createComponent(ReportPageComponent);
    
                // act
                fixture.detectChanges();
                
                // assert
                const backButton = fixture.debugElement.query(By.directive(DrawerCardComponent));
                expect(backButton).toBeTruthy();
            });
    
            it("should contain a back navigation button", () => {
                // arrange
                fixture = TestBed.createComponent(ReportPageComponent);
                component = fixture.componentInstance;
    
                // act
                fixture.detectChanges();
                
                // assert
                const backButton = fixture.debugElement.query(By.directive(BackButtonComponent));
                expect(backButton).toBeTruthy();
            });
        });

        describe("Charts", () => {
            beforeEach(() => {
                analyticsServiceMock.getReportPageById.and.returnValue(of(setUp.createInternalReportPage()));
                analyticsServiceMock.getChartsByPage.and.returnValue(of(setUp.getPpChartsArray()));
            });

            it("should display the correct amount of charts", () => {
                // arrange
                fixture = TestBed.createComponent(ReportPageComponent);

                // act
                fixture.detectChanges();

                // assert
                const chartsAmount = fixture.debugElement.queryAll(By.directive(ChartWrapperComponent)).length;
                const expectedChartsAmount = setUp.getPpChartsArray().length;
                expect(chartsAmount).toEqual(expectedChartsAmount);
            });

            it("should print correct chart type", () => {
                // arrange
                fixture = TestBed.createComponent(ReportPageComponent);

                // act
                fixture.detectChanges();

                // assert
                const printedBarChartsAmout = fixture.debugElement.queryAll(By.directive(BarChartComponent)).length;
                const expectedBarChartsAmout = setUp.getPpChartsArray().filter(x => x.chartType === ChartTypes.bar).length;

                const printedPieChartsAmount = fixture.debugElement.queryAll(By.directive(PieChartComponent)).length;
                const expectedPieChartsAmount = setUp.getPpChartsArray().filter(x => x.chartType === ChartTypes.doughnut).length;
                
                expect(printedBarChartsAmout).toEqual(expectedBarChartsAmout);
                expect(printedPieChartsAmount).toEqual(expectedPieChartsAmount);
            });
        });
    });
});