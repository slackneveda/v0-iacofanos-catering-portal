import express from 'express';
import pool from '../db/config.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Create order
router.post('/', authMiddleware, async (req, res) => {
  const { event_date, event_time, event_type, num_guests, delivery_address, delivery_city, delivery_postal_code, special_requests, items } = req.body;

  if (!event_date || !num_guests || !items || items.length === 0) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Calculate total
    let total = 0;
    for (const item of items) {
      const menuResult = await client.query('SELECT price FROM menu_items WHERE id = $1', [item.menu_item_id]);
      if (menuResult.rows.length === 0) {
        throw new Error('Menu item not found');
      }
      total += menuResult.rows[0].price * item.quantity;
    }

    // Create order
    const orderResult = await client.query(
      'INSERT INTO orders (user_id, event_date, event_time, event_type, num_guests, delivery_address, delivery_city, delivery_postal_code, special_requests, total_amount, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
      [req.userId, event_date, event_time, event_type, num_guests, delivery_address, delivery_city, delivery_postal_code, special_requests, total, 'pending']
    );

    const order = orderResult.rows[0];

    // Add order items
    for (const item of items) {
      const menuResult = await client.query('SELECT price FROM menu_items WHERE id = $1', [item.menu_item_id]);
      await client.query(
        'INSERT INTO order_items (order_id, menu_item_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [order.id, item.menu_item_id, item.quantity, menuResult.rows[0].price]
      );
    }

    await client.query('COMMIT');

    res.status(201).json({ order });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  } finally {
    client.release();
  }
});

// Get user orders
router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
      [req.userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get single order with items
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const orderResult = await pool.query(
      'SELECT * FROM orders WHERE id = $1 AND user_id = $2',
      [req.params.id, req.userId]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const itemsResult = await pool.query(
      'SELECT oi.*, mi.name, mi.description FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id WHERE oi.order_id = $1',
      [req.params.id]
    );

    res.json({
      ...orderResult.rows[0],
      items: itemsResult.rows,
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Update order status (admin only - in production add admin check)
router.put('/:id/status', authMiddleware, async (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }

  try {
    const result = await pool.query(
      'UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

export default router;
