export interface VisitLog {
    id: string;
    parkName: string;
    title: string;
    startDate: Date | null;
    endDate: Date | null;
    notes: string;
    parkRef: string;
}

export class VisitLog implements VisitLog {
    constructor(init?: VisitLogFormValues) {
      Object.assign(this, init);
    }
}

export class VisitLogFormValues {
    id?: string = undefined;
    parkName: string = '';
    title: string = '';
    startDate: Date | null = null;
    endDate: Date | null = null;
    notes: string = '';
    parkRef: string = '';

    constructor(visitLog?: VisitLogFormValues) {
        if (visitLog) {
          this.id = visitLog.id;
          this.parkName = visitLog.parkName;
          this.title = visitLog.title;
          this.startDate = visitLog.startDate;
          this.endDate = visitLog.endDate;
          this.notes = visitLog.notes;
          this.parkRef = visitLog.parkRef;
        }
      }
}