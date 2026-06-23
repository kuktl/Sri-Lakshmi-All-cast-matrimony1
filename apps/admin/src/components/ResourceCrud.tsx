import { useCallback, useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import type { ResourceDef } from '../resources';
import { api } from '../lib/api';
import { fieldsInList } from '../lib/form';
import { Button, PageHeader, Spinner, EmptyState, Badge } from './ui';
import { Modal } from './Modal';
import { ResourceForm } from './ResourceForm';

type Row = Record<string, unknown> & { id: string };

export function ResourceCrud({ def }: { def: ResourceDef }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterValue, setFilterValue] = useState<string>('');

  const [editing, setEditing] = useState<Row | null>(null);
  const [creating, setCreating] = useState(false);
  const [payload, setPayload] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const endpoint = `/api/admin/${def.key}`;

  const load = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      setRows(await api.get<Row[]>(endpoint));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    void load();
  }, [load]);

  const openCreate = (): void => {
    setEditing(null);
    setPayload({});
    setFormError(null);
    setCreating(true);
  };

  const openEdit = (row: Row): void => {
    setEditing(row);
    setPayload({});
    setFormError(null);
    setCreating(true);
  };

  const closeModal = (): void => {
    setCreating(false);
    setEditing(null);
  };

  const save = async (): Promise<void> => {
    setSaving(true);
    setFormError(null);
    try {
      if (editing) {
        await api.patch(`${endpoint}/${editing.id}`, payload);
      } else {
        await api.post(endpoint, payload);
      }
      closeModal();
      await load();
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (row: Row): Promise<void> => {
    if (!confirm(`Delete this ${def.singular.toLowerCase()}? This cannot be undone.`)) return;
    try {
      await api.del(`${endpoint}/${row.id}`);
      await load();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Failed to delete');
    }
  };

  const columns = fieldsInList(def);
  const filterField = def.filterField;
  const displayedRows = filterField && filterValue
    ? rows.filter((r) => String(r[filterField.key] ?? '') === filterValue)
    : rows;
  const countFor = (value: string): number =>
    filterField ? rows.filter((r) => String(r[filterField.key] ?? '') === value).length : 0;

  return (
    <div>
      <PageHeader
        title={def.title}
        subtitle={`${rows.length} ${rows.length === 1 ? def.singular.toLowerCase() : def.title.toLowerCase()}`}
        action={
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" /> Add {def.singular}
          </Button>
        }
      />

      {filterField && !loading && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilterValue('')}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              filterValue === '' ? 'bg-maroon-800 text-cream-50' : 'bg-cream-100 text-maroon-800 hover:bg-cream-200'
            }`}
          >
            All ({rows.length})
          </button>
          {filterField.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilterValue(opt.value)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                filterValue === opt.value ? 'bg-maroon-800 text-cream-50' : 'bg-cream-100 text-maroon-800 hover:bg-cream-200'
              }`}
            >
              {opt.label} ({countFor(opt.value)})
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <Spinner />
      ) : error ? (
        <EmptyState message={error} />
      ) : displayedRows.length === 0 ? (
        <EmptyState
          message={
            rows.length === 0
              ? `No ${def.title.toLowerCase()} yet. Click “Add ${def.singular}”.`
              : 'No records match this filter.'
          }
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-cream-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-cream-100 text-xs uppercase tracking-wide text-maroon-700/70">
              <tr>
                {columns.map((c) => (
                  <th key={c.key} className="px-4 py-3 font-semibold">
                    {c.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {displayedRows.map((row) => (
                <tr key={row.id} className="hover:bg-cream-50">
                  {columns.map((c) => (
                    <td key={c.key} className="max-w-xs truncate px-4 py-3 text-maroon-900">
                      {renderCell(row[c.key], c.type)}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" onClick={() => openEdit(row)} className="!px-2">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="danger" onClick={() => void remove(row)} className="!px-2">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={creating}
        title={editing ? `Edit ${def.singular}` : `Add ${def.singular}`}
        onClose={closeModal}
        footer={
          <>
            {formError && <p className="mr-auto self-center text-sm text-red-600">{formError}</p>}
            <Button variant="subtle" onClick={closeModal}>
              Cancel
            </Button>
            <Button onClick={() => void save()} loading={saving}>
              Save
            </Button>
          </>
        }
      >
        {creating && (
          <ResourceForm key={editing?.id ?? 'new'} def={def} initial={editing} onChange={setPayload} />
        )}
      </Modal>
    </div>
  );
}

function renderCell(value: unknown, type: string): React.ReactNode {
  if (type === 'boolean') return value ? <Badge tone="green">Yes</Badge> : <Badge>No</Badge>;
  if (value === null || value === undefined || value === '') return <span className="text-maroon-700/30">—</span>;
  if (type === 'select' && typeof value === 'string') {
    const tone = value === 'approved' ? 'green' : value === 'rejected' ? 'red' : value === 'pending' ? 'amber' : 'neutral';
    return <Badge tone={tone}>{value}</Badge>;
  }
  return String(value);
}
