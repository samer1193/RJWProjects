export interface Invoices {
    carInvoicenumber: string;
    docamnt: number;
    // invoiceRcvdDate: string;
    invoiceStatus: string;
    movenumber: number;
    loadNumber: number;
    invoiceLink: string;
    drillDown: drillDown;
}

export interface drillDown {
    docamntdd: number;
    invoiceRcvdDateDD: string;
    invoiceStatusDD: string;
    proNumberDD: string;
}