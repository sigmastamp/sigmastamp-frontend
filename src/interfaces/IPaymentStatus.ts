import { BehaviorSubject } from 'rxjs';

export type IPaymentStatus = BehaviorSubject<{
    checkedDate: Date;
    isPayed: boolean;
}>;
