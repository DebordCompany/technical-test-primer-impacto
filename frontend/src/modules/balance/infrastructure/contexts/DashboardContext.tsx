import { useQuery, type QueryStatus } from "@tanstack/react-query";
import { createContext, useContext, useState, type ReactNode } from "react";
import type { ApiRequestData, EnergyData } from "../../domain/types/ReeTypes";
import { ApiReaderRepository } from "../repositories/ApiReaderRepository";

interface DasboardContextInterface {
    reeData: EnergyData[] | null;
    reeStatus: QueryStatus;
    reeError: unknown;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    filterData: ApiRequestData;
}

const DashboardContext = createContext<DasboardContextInterface>({} as DasboardContextInterface)


export function useDashboardContext() {
    const context = useContext(DashboardContext)
    if (!context) {
        throw new Error("Should be wrapped by dashboard context")
    }
    return context
}

export function DashboardProvider({ children }: { children: ReactNode }) {
    const [filterData, setFilterData] = useState<ApiRequestData>({
        startDate: null,
        endDate: null,
    });

    const { data: reeData, status: reeStatus, error: reeError } = useQuery({
        queryKey: ["getReeData", filterData.startDate, filterData.endDate],
        queryFn: () => ApiReaderRepository.getInstance().getReeData(filterData.startDate, filterData.endDate),
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
        <DashboardContext.Provider value={{
            reeData,
            reeStatus,
            reeError,
            handleSubmit,
            filterData
        }}>
            {children}
        </DashboardContext.Provider>
    )
}