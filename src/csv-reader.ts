import {parse} from 'papaparse'

export interface UsageReportCsvEntry {
    date: string,
    product: string,
    repositorySlug: string,
    quantity: string,
    unitType: string,
    pricePerUnit: string,
    actionsWorkflow: string,
    notes: string,
}

export interface UsageReportEntry extends UsageReportCsvEntry {
    totalPrice: number
}

const camalize = (str: string): string => {
    return str.toLowerCase().replace(/[^a-zA-Z0-0]+(.)/g, (m, chr) => chr.toUpperCase());
}
export const getCsvFile = (file: File): Promise<UsageReportEntry[]> => {
    return new Promise((resolve, reject) => {

        parse<UsageReportCsvEntry>(file, {
            header: true,
            skipEmptyLines: true,
            transformHeader: (header: string): string => {
                return camalize(header)
            },
            complete: (result) => {
                const githubBillingEntries: UsageReportEntry[] = result.data.map((dailyEntry) => {
                    // remove dollar sign
                    const price = dailyEntry.pricePerUnit.substring(1)
                    return {
                        ...dailyEntry,
                        totalPrice: (parseFloat(dailyEntry.quantity) * parseFloat(price)),
                    }
                });

                resolve(githubBillingEntries)
            }
        });
    })
}