type BDAddress = {
  // Common to both
  division: string;
  district: string;
  postCode?: string;

  // Urban (optional)
  city?: string; // e.g., Dhaka North
  area?: string; // e.g., Dhanmondi
  roadNumber?: string; // e.g., Road 12
  houseNumber?: string; // e.g., House 5A
  sector?: string; // e.g., Sector 7

  // Rural (optional)
  village?: string; // e.g., Charghat
  union?: string; // e.g., Charghat Union
  upazila?: string; // e.g., Charghat Upazila
};
type Customer = {
  id: string;
  name: string;
  address: BDAddress;
  phoneNumber: string;
  alternatePhoneNumber?: string;
  email?: string;
  whatsappNumber?: string;
  debt?: number; // amount owed
  lastPurchasedDate?: string; // ISO string (e.g., "2025-07-25T13:20:00Z")
};
