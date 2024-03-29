import datesValues from '../../Values/datesValues';
import { useDashboardContext } from '../../Context/DashboardContext';
import Label from "./Label";

export default function ChartLabels() {
    const { year, month } = useDashboardContext();
    const PieChartLabel = <Label title="ESTADO DE LAS SUSCRIPCIONES" subtitle={datesValues[0].options[month - 1].label + " de " + year} />;
    const BarChartLabel = <Label title="RESUMEN DE COBRANZAS" subtitle={year} />;
    return { BarChartLabel, PieChartLabel };
}