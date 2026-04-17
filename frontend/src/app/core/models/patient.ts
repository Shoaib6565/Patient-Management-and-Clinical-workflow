export interface UsersResponse {
  message: string;
  data: {
    Patient: any[]; 
    pageinfo: {
      totalItems: number;
      totalPages: number;
      currentPage: number;
      itemsPerPage: number;
    };
  };
}