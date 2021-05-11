import {parse, ParseResult} from 'papaparse'

export interface DailyEntry {
    date: string,
    product: string,
    repository: string,
    quantity: string,
    unitType: string,
    pricePerUnit: string,
    workflow: string,
    notes: string,

}

export interface GithubDailyEntry extends DailyEntry {
    totalPrice: number
}

export const getCsvFile = (file: File): Promise</*{ [key: string]: GithubDailyEntry[] }*/GithubDailyEntry[]> => {
    return new Promise((resolve, reject) => {
        const csvArray: string[][] = []

        parse(file, {
            worker: true,
            step: (result: ParseResult<any>) => {
                csvArray.push(result.data)
            },
            complete: () => {

                //last element is an empty string
                csvArray.pop()
                //first element is an array with the headlines and no relevant data
                csvArray.shift()

                const csvDataStructuredAsObjects: DailyEntry[] = csvArray.map((value) => {
                    return {
                        date: value[0],
                        product: value[1],
                        repository: value[2],
                        quantity: value[3],
                        unitType: value[4],
                        pricePerUnit: value[5],
                        workflow: value[6],
                        notes: value[7],
                    }
                })

                const githubBillingEntries: GithubDailyEntry[] = csvDataStructuredAsObjects.map((dailyEntry) => {
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