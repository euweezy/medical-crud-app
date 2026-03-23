'use server';

import { pool } from './db';
import { revalidatePath } from 'next/cache';

export async function createCategory(formData: FormData) {
  const name = formData.get('name');
  const description = formData.get('description');

  await pool.query(
    'INSERT INTO testcategories (name, description) VALUES ($1, $2)',
    [name, description]
  );
  revalidatePath('/categories');
}

export async function createUom(formData: FormData) {
  const name = formData.get('name');
  const description = formData.get('description');

  await pool.query(
    'INSERT INTO uom (name, description) VALUES ($1, $2)',
    [name, description]
  );
  revalidatePath('/uom');
}

export async function createMedicalTest(formData: FormData) {
  const name = formData.get('name');
  const idcategory = formData.get('idcategory');
  const iduom = formData.get('iduom');
  const normalmin = formData.get('normalmin');
  const normalmax = formData.get('normalmax');

  await pool.query(
    `INSERT INTO medicaltests (name, idcategory, iduom, normalmin, normalmax) 
     VALUES ($1, $2, $3, $4, $5)`,
    [name, idcategory, iduom, normalmin, normalmax]
  );
  revalidatePath('/medicaltests');
}

export async function deleteUom(id: number) {
  await pool.query('DELETE FROM uom WHERE id = $1', [id]);
  revalidatePath('/uom');
}

export async function deleteCategory(id: number) {
  await pool.query('DELETE FROM testcategories WHERE id = $1', [id]);
  revalidatePath('/categories');
}

export async function deleteMedicalTest(id: number) {
  await pool.query('DELETE FROM medicaltests WHERE id = $1', [id]);
  revalidatePath('/medicaltests');
}