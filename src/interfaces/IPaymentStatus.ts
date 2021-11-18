import { BehaviorSubject } from 'rxjs';

export type IPaymentStatus = BehaviorSubject<{
    date: Date;
    isPayed: boolean;
}>;
