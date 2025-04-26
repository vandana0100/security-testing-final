export class RepositoryError extends Error {
    constructor(message: string, public code: string | number = "500") {
      super(message);
      this.name = "RepositoryError";
    }
  }
  
  export class ServiceError extends Error {
    constructor(message: string, public code: string | number = "500") {
      super(message);
      this.name = "ServiceError";
    }
  }
  