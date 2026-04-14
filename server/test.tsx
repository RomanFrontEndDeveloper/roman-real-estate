import express, { Request, Response } from 'express';
import cors from 'cors';
import { randomUUID } from 'crypto';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

/* ================== MODEL ================== */

interface Property {
	id: string;
	title: string;
	price: number;
	location: string;
	image: string;
	createdAt: Date;
}

/* ================== DATA ================== */

let properties: Property[] = [];

/* ================== SERVICE ================== */

// GET ALL
const getAll = (): Property[] => {
	return [...properties];
};

// GET BY ID
const getById = (id: string): Property | undefined => {
	return properties.find((p) => p.id === id);
};

// CREATE
const create = (data: Omit<Property, 'id' | 'createdAt'>): Property => {
	if (!data.title || typeof data.price !== 'number') {
		throw new Error('Invalid data');
	}

	const newProperty: Property = {
		...data,
		id: randomUUID(),
		createdAt: new Date(),
	};

	properties.push(newProperty);
	return newProperty;
};

// UPDATE
const update = (id: string, data: Partial<Property>): Property | null => {
	const index = properties.findIndex((p) => p.id === id);

	if (index === -1) return null;

	properties[index] = {
		...properties[index],
		...data,
	};

	return properties[index];
};

// DELETE
const remove = (id: string): boolean => {
	const initialLength = properties.length;

	properties = properties.filter((p) => p.id !== id);

	return properties.length < initialLength;
};

/* ================== CONTROLLER ================== */

// GET ALL
app.get('/api/properties', (req: Request, res: Response) => {
	res.json(getAll());
});

// GET BY ID
app.get('/api/properties/:id', (req: Request, res: Response) => {
	const property = getById(req.params.id);

	if (!property) {
		return res.status(404).json({ message: 'Not found' });
	}

	res.json(property);
});

// CREATE
app.post('/api/properties', (req: Request, res: Response) => {
	try {
		const property = create(req.body);
		res.status(201).json(property);
	} catch {
		res.status(400).json({ message: 'Invalid data' });
	}
});

// UPDATE
app.put('/api/properties/:id', (req: Request, res: Response) => {
	const updated = update(req.params.id, req.body);

	if (!updated) {
		return res.status(404).json({ message: 'Not found' });
	}

	res.json(updated);
});

// DELETE
app.delete('/api/properties/:id', (req: Request, res: Response) => {
	const deleted = remove(req.params.id);

	if (!deleted) {
		return res.status(404).json({ message: 'Not found' });
	}

	res.status(204).send();
});

/* ================== SERVER ================== */

app.get('/', (req, res) => {
	res.send('API is working 🚀');
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
