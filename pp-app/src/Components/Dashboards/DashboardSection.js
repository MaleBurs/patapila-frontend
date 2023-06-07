import React, { useEffect } from "react";
import PieChartModule from "./PieChartModule";
import BarChartModule from "./BarChartModule";
import TotalAmountModule from "./TotalAmountModule";
import { useOpenChartsContext } from "../../Context/OpenChartsContext";
import ChartModal from "./ChartsModal";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import ChartLabels from "./ChartLabels";
import Card from "../Utiles/Card";
import datesValues from "../../Values/datesValues";
import TwoColumnsPage from "../Utiles/TwoColumnsPage";
import InformationTooltips from "../Utiles/InformationDisplayTooltip";
import { useDashboardContext } from "../../Context/DashboardContext";
import Label from "../Dashboards/Label";
import Loading from "../Utiles/Loading";
import BarChart2ColsModule from "./BarChart2ColsModule";

const DashboardSection = () => {
  const {showBarChart1, showBarChart2, showBarChart3, showPieChart, setShowBarChart1, setShowBarChart2, setShowBarChart3, showBarChart2Cols, setShowBarChart2Cols, setShowBarChart4, showBarChart4} = useOpenChartsContext();
  const { BarChartLabel, PieChartLabel } = ChartLabels();
  const { year, month, loading, totalUsersByMonth, totalSubsByMonth } = useDashboardContext();
  const { monthlyAmount, totalAmountByMode, monthlyAmountBySubs} = useDashboardContext();

  const totalAmountOnlyTime = totalAmountByMode.map((obj) => {
    return { label: obj.label, value: obj.onlyTimeAmount }})
  const totalAmountRecurrent = totalAmountByMode.map((obj) => {
    return { label: obj.label, value: obj.recurrentAmount } })


  return (
    <div className="mt-5"> 
        {(showBarChart2Cols) ? 
         <ChartModal 
            chart={<BarChart2ColsModule  label="CANTIDAD DE USUARIOS" label2="CANTIDAD DE SUSCRIPCIONES" data={totalUsersByMonth} data2={totalSubsByMonth} id="bar2cols"></BarChart2ColsModule>} 
            chartContainerStyle={{ height:'60vh', width:'fit'}}
            label ={<Label title="CANTIDAD DE USUARIOS DE LA APLICACIÓN Y CANTIDAD DE SUSCRIPCIONES" subtitle={year} />}/>   
        :
        <></>}
        {(showBarChart1) ? 
         <ChartModal 
            chart={<BarChart label="INGRESOS" data={monthlyAmount} id="bar1"></BarChart>} 
            chartContainerStyle={{ height:'60vh', width:'100vh'}}
            label ={<Label title="REPORTE DE COBRANZAS Y PROXIMOS PAGOS POR SUSCRIPCIONES" subtitle={year} />}/>   
        :
        <></>}
         {(showBarChart2) ? 
         <ChartModal 
            chart={<BarChart label="INGRESOS POR DONACIONES" data={totalAmountOnlyTime} id="bar2"></BarChart>} 
            chartContainerStyle={{ height:'60vh', width:'100vh'}}
            label = {<Label title="INGRESOS POR DONACIONES" subtitle={year} />}/>   
        :
        <></>}
         {(showBarChart3) ? 
         <ChartModal 
            chart={<BarChart  label="INGRESOS POR SUSCRIPCIONES" data={totalAmountRecurrent} id="bar3"></BarChart>} 
            chartContainerStyle={{ height:'60vh', width:'100vh'}}
            label = {<Label title="INGRESOS POR SUSCRIPCIONES" subtitle={year} />}/>   
        :
        <></>}
        {(showBarChart4) ? 
         <ChartModal 
            chart={<BarChart  label="INGRESOS ESPERADOS POR SUSCRIPCIONES" data={monthlyAmountBySubs} id="bar4"></BarChart>} 
            chartContainerStyle={{ height:'60vh', width:'100vh'}}
            label = {<Label title="INGRESOS  ESPERADOS POR SUSCRIPCIONES" subtitle={year} />}/>   
        :
        <></>}
        {(showPieChart)? 
         <ChartModal 
            chart={<PieChart legendSize="20"></PieChart>} 
            chartContainerStyle={{ height:'60vh', width:'100vh'}}
            label = {PieChartLabel}/>
        : 
        <></>}
        {loading?    
        <div className="bg-transparent h-screen flex justify-center mt-20"><Loading></Loading></div>
        :
        <TwoColumnsPage
            column1={
                <>
                {!(year> (new Date().getFullYear()) || (year=== (new Date().getFullYear()) && month> (new Date().getMonth() + 1)))&&
                <>
                <Card 
                title="estado de las subscripciones" 
                subtitle={datesValues[0].options[month - 1].label + " de " + year}
                content={
                    <div className="flex flex-col">
                    <div className="p-2 self-end"><InformationTooltips.InstructionTooltip size="h-3 w-3" tooltipContent="Haz click en cualquier gráfico para expandirlo" /></div>
                     <PieChartModule label={PieChartLabel}></PieChartModule>
                    </div>}
                />   
                <Card 
                    title={
                        (year<(new Date().getFullYear())) || (month<(new Date().getMonth() + 1) && year===(new Date().getFullYear()))?
                        "IMPORTE TOTAL COBRADO"
                        :
                        "IMPORTE TOTAL A COBRAR"
                        }
                    subtitle={datesValues[0].options[month-1].label + " de " + year}
                    content={<TotalAmountModule></TotalAmountModule>}
                />
                </>
                }
                <Card
                title="INGRESOS ESPERADOS POR SUSCRIPCIONES"
                subtitle = {year}
                content={<BarChartModule openModule={()=>setShowBarChart4(true)} label="INGRESOS POR SUSCRIPCIONES" data={monthlyAmountBySubs} id="bar4"></BarChartModule>}
                /> 
                <Card
                title="CANTIDAD USUARIOS DE LA APLICACIÓN Y CANTIDAD DE SUSCRIPCIONES"
                subtitle = {year}
                content={<BarChart2ColsModule openModule={()=>setShowBarChart2Cols(true)} label="CANTIDAD DE USUARIOS " label2="CANTIDAD DE SUSCRIPCIONES" data={totalUsersByMonth} data2={totalSubsByMonth} id="bar2cols"></BarChart2ColsModule>}
                />
                </>
            }
            column2={
                <>
                <Card
                title="REPORTE COBRANZAS Y PROXIMOS PAGOS POR SUSCRIPCIONES"
                subtitle = {year}
                content={<BarChartModule openModule={()=>setShowBarChart1(true)} label="INGRESOS" data={monthlyAmount} id="bar1"></BarChartModule>}
                />
                <Card
                title="INGRESOS POR DONACIONES"
                subtitle = {year}
                content={<BarChartModule openModule={()=>setShowBarChart2(true)} label="INGRESOS POR DONACIONES" data={totalAmountOnlyTime} id="bar2"></BarChartModule>}
                />
                <Card
                title="INGRESOS POR SUSCRIPCIONES"
                subtitle = {year}
                content={<BarChartModule openModule={()=>setShowBarChart3(true)} label="INGRESOS POR SUSCRIPCIONES" data={totalAmountRecurrent} id="bar3"></BarChartModule>}
                /> 
                </>
            }
        />
        }    
    </div>
  );
};
export default DashboardSection;

