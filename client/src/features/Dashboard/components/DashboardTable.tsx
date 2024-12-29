import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

import {
  Table as ShadTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Edit, Trash, ChevronUp, ChevronDown } from 'lucide-react';

import { Modal } from '@/components/Modal';

type TableColumn<T> = {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  sortable?: boolean;
};

type DashboardTableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  className?: string;
  rowsPerPage?: number;
};

const DashboardTable = <T extends Record<string, any>>({
  columns,
  data,
  onDelete,
  className,
  rowsPerPage = 5
}: DashboardTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'asc' | 'desc' } | null>(
    null
  );
  const [tableData, setTableData] = useState(data); // Maintain table data locally
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<T | null>(null);

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return tableData;

    return [...tableData].sort((a, b) => {
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];
      if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [tableData, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSort = (accessor: keyof T) => {
    setSortConfig((prev) =>
      prev?.key === accessor
        ? { key: accessor, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key: accessor, direction: 'asc' }
    );
  };

  const handleDelete = () => {
    if (rowToDelete) {
      const updatedData = tableData.filter((row) => row !== rowToDelete);
      setTableData(updatedData);
      onDelete?.(rowToDelete);
    }
    setRowToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const openDeleteModal = (row: T) => {
    setRowToDelete(row);
    setIsDeleteModalOpen(true);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<T | null>(null);

  const closeModal = () => {
    setEditingRow(null);
    setIsModalOpen(false);
  };

  const handleEdit = (row: T) => {
    setIsModalOpen(true);
    setEditingRow(row);
  };

  const [selectedRows, setSelectedRows] = useState<Set<T>>(new Set());
  const toggleRowSelection = (row: T) => {
    setSelectedRows((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(row)) {
        newSelection.delete(row);
      } else {
        newSelection.add(row);
      }
      return newSelection;
    });
  };

  const toggleSelectAll = (isSelected: boolean) => {
    setSelectedRows(isSelected ? new Set(paginatedData) : new Set());
  };

  const isAllSelected = selectedRows.size === paginatedData.length && paginatedData.length > 0;

  return (
    <>
      {isModalOpen && editingRow && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h3 className='text-lg font-bold'>Edit Row</h3>
          <div className='mt-4'>
            <p>ID: {editingRow.id}</p>
            <p>Name: {editingRow.name}</p>
            <p>Role: {editingRow.role}</p>
          </div>
          <div className='mt-6 flex justify-end'>
            <Button
              variant='secondary'
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button
              className='ml-4'
              onClick={() => {
                closeModal();
              }}
            >
              Save
            </Button>
          </div>
        </Modal>
      )}
      {isDeleteModalOpen && rowToDelete && (
        <Modal onClose={() => setIsDeleteModalOpen(false)}>
          <h3 className='text-lg font-bold'>Confirm Deletion</h3>
          <p className='mt-4'>
            Are you sure you want to delete <strong>{rowToDelete.name}</strong>?
          </p>
          <div className='mt-6 flex justify-end'>
            <Button
              variant='secondary'
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className='ml-4 text-red-500'
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </Modal>
      )}

      <div className={`overflow-x-auto p-6 ${className}`}>
        <ShadTable>
          <TableHeader>
            <TableHead>
              <input
                type='checkbox'
                checked={isAllSelected}
                onChange={(e) => toggleSelectAll(e.target.checked)}
              />
            </TableHead>
            <TableRow>
              {columns.map((col, index) => (
                <TableHead
                  key={index}
                  className='cursor-pointer'
                  onClick={() => col.sortable && handleSort(col.accessor)}
                >
                  <div className='flex items-center'>
                    {col.header}
                    {col.sortable && sortConfig?.key === col.accessor && (
                      <span className='ml-2'>
                        {sortConfig.direction === 'asc' ? (
                          <ChevronUp className='h-4 w-4' />
                        ) : (
                          <ChevronDown className='h-4 w-4' />
                        )}
                      </span>
                    )}
                  </div>
                </TableHead>
              ))}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>
                  <input
                    type='checkbox'
                    checked={selectedRows.has(row)}
                    onChange={() => toggleRowSelection(row)}
                  />
                </TableCell>
                {columns.map((col, colIndex) => (
                  <TableCell key={colIndex}>
                    {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                  </TableCell>
                ))}
                <TableCell>
                  <div className='flex space-x-2'>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => handleEdit(row)}
                    >
                      <Edit className='h-4 w-4 text-blue-500' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => openDeleteModal(row)}
                    >
                      <Trash className='h-4 w-4 text-red-500' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ShadTable>
        <div className='flex justify-between items-center mt-4'>
          <span className='text-sm text-gray-600'>
            Page {currentPage} of {totalPages}
          </span>
          <div className='flex space-x-2'>
            <Button
              variant='ghost'
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </Button>
            <Button
              variant='ghost'
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardTable;
