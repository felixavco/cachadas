export const categories = [
  { label: '* Select a category', value: "none" },
  { label: 'Smart Phones & Tablets', value: 'smartphones' },
  { label: 'Computers and Electronics', value: 'electronics' },
  { label: 'Cars & Motorcycles', value: 'vehicles' },
  { label: 'Real Estate', value: 'real_estate' },
  { label: 'Clothing & Accessories', value: 'clothing' },
  { label: 'Services', value: 'services' },
  { label: 'Food & Drinks', value: 'food' },
  { label: 'Other', value: 'other' }
];

export const problem_descriptions = [
  { label: '* Select a category', value: "none" },
  { label: 'Account Verification', value: "Account-Verification" },
  { label: 'Interface Issues', value: "Interface" },
  { label: 'Other', value: "Other" },
];

export const carMaker = [
  {label: '* Select Make', value: ''},
  { label: 'Acura', value: 'Acura' },
  { label: 'Audi', value: 'Audi' },
  { label: 'BMW', value: 'BMW' },
  { label: 'Chevrolet', value: 'Chevrolet' },
  { label: 'Chrysler', value: 'Chrysler' },
  { label: 'Dodge', value: 'Dodge' },
  { label: 'Ford', value: 'Ford' },
  { label: 'Freightliner', value: 'Freightliner' },
  { label: 'Hero', value: 'Hero' },
  { label: 'Honda', value: 'Honda' },
  { label: 'Hyundai', value: 'Hyundai' },
  { label: 'Isuzu', value: 'Isuzu' },
  { label: 'Jeep', value: 'Jeep' },
  { label: 'Kia', value: 'Kia' },
  { label: 'Lexus', value: 'Lexus' },
  { label: 'Mack', value: 'Mack' },
  { label: 'Mazda', value: 'Mazda' },
  { label: 'Mercedes Benz', value: 'Mercedes Benz' },
  { label: 'Mitsubishi', value: 'Mitsubishi' },
  { label: 'Nissan', value: 'Nissan' },
  { label: 'Porsche', value: 'Porsche' },
  { label: 'Renault', value: 'Renault' },
  { label: 'Susuki', value: 'Susuki' },
  { label: 'Toyota', value: 'Toyota' },
  { label: 'Volkswagen', value: 'Volkswagen' },
  { label: 'Volvo', value: 'Volvo' },
  { label: 'Yamaha', value: 'Yamaha' },
  { label: 'Other', value: 'Other' },
];

export const Types = [
  {label: '* Select Type', value: ''},
  {label: 'Sedan', value: 'Sedan'},
  {label: 'SUV', value: 'SUV'},
  {label: 'Compact', value: 'Compact'},
  {label: 'Motorcycle', value: 'Motorcycle'},
  {label: 'Truck', value: 'Truck'}
]

export const Transmisions = [
  {label: '* Transmision Type', value: ''},
  {label: 'Automatic', value: 'Automatic'},
  {label: 'Manual', value: 'Manual'}
]

export const GAS = [
  {label: 'Gasoline', value: 'Gasoline'},
  {label: 'Diesel', value: 'Diesel'},
  {label: 'Hybrid', value: 'Hybrid'},
  {label: 'Electric', value: 'Electric'},
]

export const PropertyTypes = [
  {label: "* Prolerty Type", value: ''},
  {label: "House", value: 'House'},
  {label: "Room", value: 'Room'},
  {label: "Apartment", value: 'Apartment'},
  {label: "Terrain", value: 'Terrain'},
]

export const Transactions = [
  {label: 'Sell', value: 'Sell'},
  {label: 'Rent', value: 'Rent'},
  {label: 'Buy', value: 'Buy'}
]

export const Rooms = [
  {label: '* Rooms', value: ''},
  {label: '2', value: '2'},
  {label: '3', value: '3'},
  {label: '4', value: '4'},
  {label: '+5', value: '+5'},
]

export const Bathrooms = [
  {label: '* Bathrooms', value: ''},
  {label: '1', value: '1'},
  {label: '2', value: '2'},
  {label: '3', value: '3'},
  {label: '+4', value: '+4'},
]

let y = new Date().getFullYear();
let i = y - 35
const Years = []

for(i ; i <= y; i++) {
  Years.unshift({label: i, value: i})
}

export const Year = [{label: '* Select Year', value: ''}, ...Years]