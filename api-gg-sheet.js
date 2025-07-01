const { google } = require('googleapis');

// Tạo Google Auth từ service account key
const auth = new google.auth.GoogleAuth({
  keyFile: 'discor-send-message-e72567e58313.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Hàm append dữ liệu vào sheet cụ thể
async function appendRow(spreadsheetId, sheetName, values) {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const range = `${sheetName}!A1`;

  const resource = {
    values: [values],
  };

  const result = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    resource,
  });

  console.log(`✅ Appended ${result.data.updates.updatedCells} cells to sheet "${sheetName}".`);
}

// Hàm tạo sheet mới với tên tùy chọn
async function createNewSheet(spreadsheetId, newSheetName) {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  try {
    const request = {
      spreadsheetId,
      resource: {
        requests: [
          {
            addSheet: {
              properties: {
                title: newSheetName,
              },
            },
          },
        ],
      },
    };

    await sheets.spreadsheets.batchUpdate(request);
    console.log(`✅ Sheet "${newSheetName}" created successfully.`);
  } catch (err) {
    if (
      err.errors &&
      err.errors[0] &&
      err.errors[0].reason === 'duplicate' // Sheet đã tồn tại
    ) {
      console.log(`⚠️ Sheet "${newSheetName}" already exists.`);
    } else {
      console.error('❌ Error creating sheet:', err.message);
    }
  }
}

async function writeToTableCell(spreadsheetId, range, values) {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const res = await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    resource: {
      values,
    },
  });

  console.log(`✅ Đã ghi dữ liệu vào range "${range}". Số ô được cập nhật: ${res.data.updatedCells}`);
}

async function getNextEmptyRow(spreadsheetId, sheetName, columnLetter = null) {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const range = columnLetter
    ? `${sheetName}!${columnLetter}1:${columnLetter}`
    : `${sheetName}!A1:Z`;

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const numRows = res.data.values ? res.data.values.length : 0;
  return numRows + 1;
}

const spreadsheetId = '18bld3qPXIrNxVN210oDsQUutog5Z6R-WZunLEF3tMHY';

(async () => {
  // await createNewSheet(spreadsheetId, 'new_sheet_from_node');

  await writeToTableCell(spreadsheetId, 'release!B2:D2', [['Sản phẩm A', 120000, 'Đã kiểm tra']]);
  // await appendRow(spreadsheetId, 'new_sheet_from_node', [
  //   new Date().toISOString(),
  //   'Dòng mới',
  //   'Gửi từ Node.js',
  // ]);
})();
