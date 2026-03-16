
import { useDashboardContext } from "../contexts/DashboardContext";
import { DashboardChart } from "./DashboardChart";

export function DashboardContext() {
    const { handleSubmit, reeData, reeError, reeStatus, filterData } = useDashboardContext()

    return (
        <main className="flex items-center justify-center w-full bg-neutral-100 min-h-dvh p-4 text-neutral-800">
            <section className="bg-white p-4 rounded-lg w-full h-full max-w-3xl flex flex-col gap-4">
                <div>
                    <h1 className="font-bold text-xl">Gráficas</h1>
                    <p className="text-neutral-600 text-sm">Mira los registros de la Red Española Eléctrica</p>
                </div>
                <form onSubmit={handleSubmit} className="flex items-end justify-between">
                    <fieldset className="flex items-center gap-2">
                        <label className="flex flex-col">
                            <span className="text-xs">Día inicio</span>
                            <input type="date" name="startDate" />
                        </label>
                        <label className="flex flex-col">
                            <span className="text-xs">Día fin</span>
                            <input type="date" name="endDate" />
                        </label>
                    </fieldset>
                    <button className="px-3 py-1 text-white bg-neutral-800 rounded-md" type="submit">Buscar</button>
                </form>
                <div className="">
                    <div className="rounded-md shadow-lg p-4 border border-neutral-100 w-full min-h-96">
                        {(!filterData.startDate && !filterData.endDate) && <div>Seleccione un rango de fechas</div>}
                        {(reeStatus === "pending" && filterData.startDate && filterData.endDate) && <div>Cargando...</div>}
                        {reeError != null && (
                            <div className="text-red-500">
                                Error: {reeError instanceof Error ? reeError.message : "Unknown error"}
                            </div>
                        )}
                        {reeData && (
                            <DashboardChart dataArr={reeData} />
                        )}
                        {!reeData && reeStatus === "success" && <div>No hay datos disponibles.</div>}
                    </div>
                </div>
            </section>
        </main>
    );
}