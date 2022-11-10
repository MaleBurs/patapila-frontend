import datesValues from '../../Values/datesValues';
import { useMonthlySubscriptionStateContext } from "../../Context/MonthlySubscriptionStateContext";
import Label from "./Label";

export default function ChartLabels() {
    const { year, month } = useMonthlySubscriptionStateContext();
    const PieChartLabel = <Label title="estado de las subscripciones" subtitle={datesValues[0].options[month - 1].label + " de " + year} />;
    const BarChartLabel = <Label title="RESUMEN DE COBRANZAS" subtitle={year} />;
    return { BarChartLabel, PieChartLabel };
}