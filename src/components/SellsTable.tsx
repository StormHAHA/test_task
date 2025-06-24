'use client';

import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import styles from '../styles/SellsTable.module.scss';

type Service = {
  service: string;
  sells: string;
  cheapest: boolean;
  support: string;
  paymentWays: string[];
};

const data: Service[] = [
  {
    service: 'AccsMarket',
    sells: 'IG, Discord, Twitter, Google, TG и тд',
    cheapest: false,
    support: '3 минуты',
    paymentWays: ['USDT', 'BTC'],
  },
  {
    service: 'Dolphin',
    sells: '0.9$',
    cheapest: true,
    support: '3 минуты',
    paymentWays: Array(15).fill('Solana'),
  },
  {
    service: 'AccsMarket',
    sells: 'YouTube Premium, Reddit',
    cheapest: true,
    support: '2 минуты',
    paymentWays: ['USDT', 'USDT'],
  },
  {
    service: 'Dolphin',
    sells: 'Gmail, Instagram, TikTok',
    cheapest: false,
    support: '5 минут',
    paymentWays: ['BTC', 'ETH'],
  },
  {
    service: 'AccsMarket',
    sells: 'Google Workspace, Discord',
    cheapest: true,
    support: '1 минута',
    paymentWays: ['USDT', 'BTC', 'ETH', 'XRP'],
  },
  {
    service: 'Dolphin',
    sells: 'Steam, WhatsApp',
    cheapest: false,
    support: '7 минут',
    paymentWays: ['Solana'],
  },
  {
    service: 'AccsMarket',
    sells: 'Twitter, Facebook',
    cheapest: false,
    support: '4 минуты',
    paymentWays: ['Solana', 'BTC'],
  },
  {
    service: 'Dolphin',
    sells: 'Instagram, Gmail, Discord Nitro',
    cheapest: true,
    support: '2 минуты',
    paymentWays: ['USDT'],
  },
  {
    service: 'AccsMarket',
    sells: 'Reddit, Google Voice, TikTok',
    cheapest: true,
    support: '6 минут',
    paymentWays: ['ETH', 'XRP'],
  },
  {
    service: 'Dolphin',
    sells: 'YouTube, Twitter, WhatsApp',
    cheapest: false,
    support: '3 минуты',
    paymentWays: ['BTC', 'ETH'],
  },
];

const serviceIcons: Record<string, string> = {
  AccsMarket: '/icon1.svg',
  Dolphin: '/icon2.svg',
};

const paymentIcons: Record<string, string> = {
  USDT: '/usdt.svg',
  BTC: '/btc.svg',
  Solana: '/sol.svg',
  XRP: '/xrp.svg',
  ETH: '/eth.svg',
};

export default function SellsTable() {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const columns: ColumnDef<Service>[] = [
  {
  header: 'Сервис',
  accessorKey: 'service',
  cell: info => {
    const serviceName = info.getValue() as string;
    const iconSrc = serviceIcons[serviceName];
    const rowIndex = info.row.index;
    const isExpanded = expandedRow === rowIndex;

    return (
      <div className={styles.service_main}>
        {isExpanded && (
          <div className={styles.extra} style={{paddingLeft: 12}}>
            Сервис
          </div>
        )}
        <div className={styles.service_container}>
          {iconSrc && (
            <img src={iconSrc} alt={serviceName} style={{ width: 30, height: 30 }} />
          )}
          <span>{serviceName}</span>
        </div>

      </div>
    );
  },
},
  {
    header: 'Что продают?',
    accessorKey: 'sells',
    cell: info => {
    const rowIndex = info.row.index;
    const isExpanded = expandedRow === rowIndex;
    const row = info.row.original;

    return (
      <div>
        {isExpanded && (
        <div className={styles.extra}>Что продают?</div>
          
        )}
        <div>{row.sells}</div>
        {isExpanded && (
          <>
          <div className={styles.extra} style={{paddingTop: 8}}>
            Техподдержка:
          </div>
          <div>{row.support}</div>
          </>
        )}

      </div>
    );
  },
  },
  {
  header: 'Дешевле всего',
  accessorKey: 'cheapest',
  cell: info => {
    const rowIndex = info.row.index;
    const isExpanded = expandedRow === rowIndex;
    const value = info.getValue() as boolean;

    return isExpanded ? (
      <div>
        <div className={styles.extra}>Дешевле всего</div>
        <div>{value ? 'Да' : '-'}</div>
      </div>
    ) : (
      <div>{value ? 'Да' : '-'}</div>
    );
  },
},
  {
    header: 'Тех. поддержка',
  accessorKey: 'support',
  id: 'support',
  size: 190,
  cell: info => {
    const rowIndex = info.row.index;
    const isExpanded = expandedRow === rowIndex;
    const row = info.row.original;

    return isExpanded ? (
      <>

        <div className={styles.extra}>Оплата</div>
        <div className={styles.paymentIcons}>
        {row.paymentWays.map((way, i) => {
  const iconSrc = paymentIcons[way];
  return (
    <div key={i} className={styles.paymentIcon} title={way}>
      {iconSrc ? (
        <img src={iconSrc} alt={way} style={{ width: 30, height: 30 }} />
      ) : (
        <span>{way}</span>
      )}
    </div>
  );
})}
      </div></>
    ) : (
      <div>{row.support}</div>
    );
  },
  },
  {
  id: 'expander',
  header: '',
  cell: info => {
    const rowIndex = info.row.index;
    const isExpanded = expandedRow === rowIndex;

    return (
      <div
        className={`${styles.arrow} ${isExpanded ? styles.expanded : ''}`}
        onClick={e => {
          e.stopPropagation();
          toggleRow(rowIndex);
        }}
      >
        <img src="/keyboard_arrow_down.svg" alt="expand" />
      </div>
    );
  },
}

];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const toggleRow = (index: number) => {
    setExpandedRow(prev => (prev === index ? null : index));
  };

  return (
    <div className={styles.component_container}>
    <table className={styles.sells_table}>
      <thead>
  {table.getHeaderGroups().map(headerGroup => (
    <tr key={headerGroup.id}>
      {headerGroup.headers.map(header => (
        <th
          key={header.id}
          style={{
            width: header.column.columnDef.size ?? 'auto', // используем заданный size
            maxWidth: header.column.columnDef.size ?? 'auto',
            minWidth: header.column.columnDef.size ?? 'auto',
          }}
        >
          {flexRender(header.column.columnDef.header, header.getContext())}
        </th>
      ))}
    </tr>
  ))}
</thead>
<tbody>
  {table.getRowModel().rows.map((row, index) => (
    <React.Fragment key={row.id}>
      <tr
        onClick={() => toggleRow(index)}
        className={`${styles.row} ${expandedRow === index ? styles.expandedRow : ''}`}
      >
        {row.getVisibleCells().map(cell => (
          <td
            key={cell.id}
            style={{
              width: cell.column.columnDef.size ?? 'auto',
              maxWidth: cell.column.columnDef.size ?? 'auto',
              minWidth: cell.column.columnDef.size ?? 'auto',
            }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    </React.Fragment>
  ))}
</tbody>

    </table>
    </div>
  );
}
