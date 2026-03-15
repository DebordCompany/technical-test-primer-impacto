import { useQuery } from "@tanstack/react-query";
import { EnvKeyEnum, getEnv } from "../../../shared/infrastructure/helpers/getEnv";
import { useState } from "react";
import { DashboardChart } from "./DashboardChart";

export function DashboardContext() {
    const [filterData, setFilterData] = useState<{ startDate: string | null; endDate: string | null }>({
        startDate: null,
        endDate: null,
    });

    async function getReeData(startDate?: string | null, endDate?: string | null) {
        if (!startDate || !endDate) return null;
        const url = `${getEnv(EnvKeyEnum.VITE_BACK_API)}/balance?start_date=${startDate}&end_date=${endDate}`;
        const raw = await fetch(url);
        const response = await raw.json();
        return response.data;
    }

    const { data, status, error } = useQuery({
        queryKey: ["getReeData", filterData.startDate, filterData.endDate],
        queryFn: () => getReeData(filterData.startDate, filterData.endDate),
        enabled: !!filterData.startDate && !!filterData.endDate,
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        setFilterData({
            startDate: formData.get("startDate") as string,
            endDate: formData.get("endDate") as string,
        });
    }

    return (
        <main className="flex items-center justify-center w-full bg-neutral-100 min-h-dvh p-4 text-neutral-800">
            <section className="bg-white p-4 rounded-lg w-full h-full max-w-3xl flex flex-col gap-4">
                <div>
                    <h1 className="font-bold text-xl">Graficas</h1>
                    <p className="text-neutral-600 text-sm">Mira los registros de la Red Española Electrica</p>
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
                    <button type="submit">Buscar</button>
                </form>
                <div className="">
                    <div className="rounded-md shadow-lg p-4 border border-neutral-100 w-full min-h-96">
                        {(!filterData.startDate && !filterData.endDate) && <div>Seleccione un rango de fecha</div>}
                        {(status === "pending" && filterData.startDate && filterData.endDate) && <div>Cargando...</div>}
                        {error && <div className="text-red-500">Error: {(error as Error).message}</div>}
                        {data && (
                            <DashboardChart dataArr={data} />
                        )}
                        {!data && status === "success" && <div>No hay datos.</div>}
                    </div>
                </div>
            </section>
        </main>
    );
}