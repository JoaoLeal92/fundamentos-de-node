import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    // TODO
    // Buscando todas as transações
    const transactions = transactionsRepository.all();

    // Calculando o balance
    const balance = transactionsRepository.getBalance();

    const result = {
      transactions,
      balance,
    };

    return response.json(result);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // TODO
    // Cria instancia da regra de negócio
    const createTransactionService = new CreateTransactionService(
      transactionsRepository,
    );

    // Recebe os parâmetros da requisição
    const { title, value, type } = request.body;

    const transaction = createTransactionService.execute({
      title,
      value,
      type,
    });

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
