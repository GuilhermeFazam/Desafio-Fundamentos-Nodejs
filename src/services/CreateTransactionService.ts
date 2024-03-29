import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
    title: string;
    value: number;
    type: 'income' | 'outcome';
}

class CreateTransactionService {
    private transactionsRepository: TransactionsRepository;

    constructor(transactionsRepository: TransactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }

    public execute({ title, type, value }: CreateTransactionDTO): Transaction {
        const { total } = this.transactionsRepository.getBalance();

        if (type === 'outcome' && value > total) {
            throw Error('Value > Total');
        }
        const transaction = this.transactionsRepository.create({
            title,
            type,
            value,
        });

        return transaction;
    }
}

export default CreateTransactionService;
