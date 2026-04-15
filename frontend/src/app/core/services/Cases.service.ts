import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API_URL } from "../constants/apiUrl.constant";

@Injectable({
    providedIn: 'root',
})
export class CasesService {
    private readonly http: HttpClient = inject(HttpClient);
    private readonly apiUrl = API_URL;

    constructor() {}

    getAllCases() {
        return this.http.get(`${this.apiUrl.baseUrl}${this.apiUrl.cases}`);
    }
    getCaseById(caseId: string) {
        return this.http.get(`${this.apiUrl.baseUrl}${this.apiUrl.cases}/${caseId}`);
    }
    createCase(caseData: any) {
        return this.http.post(`${this.apiUrl.baseUrl}${this.apiUrl.cases}`, caseData);
    }
    updateCase(caseId: string, caseData: any) {
        return this.http.put(`${this.apiUrl.baseUrl}${this.apiUrl.cases}/${caseId}`, caseData);
    }
    deleteCase(caseId: string) {
        return this.http.delete(`${this.apiUrl.baseUrl}${this.apiUrl.cases}/${caseId}`);
    }
    exportCasesCSV() {
        return this.http.get(`${this.apiUrl.baseUrl}${this.apiUrl.cases}/export`, { responseType: 'blob' });
        // BLOBs (Binary Large Objects) are commonly used to store multimedia files, such as images, videos, and audio files, as well as other types of large data. In the context of web applications, BLOBs are often used to handle file uploads and downloads, allowing developers to manage and manipulate large files efficiently.
    }
    getCaseCount() {
        return this.http.get(`${this.apiUrl.baseUrl}${this.apiUrl.cases}/count`);
    }
}