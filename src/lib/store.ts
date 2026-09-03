// Resilient Store helper to preserve volunteers and members across Vercel serverless container instances and page reloads

export interface StoredVolunteer {
  id: string;
  userId?: string | null;
  name: string;
  email: string;
  phone: string;
  dob?: string | null;
  address?: string | null;
  city?: string | null;
  occupation?: string | null;
  education?: string | null;
  skills: string;
  availability: string;
  interests?: string | null;
  motivation?: string | null;
  profilePhoto?: string | null;
  status: string; // PENDING, APPROVED, VERIFIED, REJECTED
  verificationNotes?: string | null;
  totalHours: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  assignments?: any[];
  attendances?: any[];
  certificates?: any[];
}

export interface StoredMember {
  id: string;
  userId?: string | null;
  membershipNo: string;
  planId: string;
  memberName: string;
  memberEmail: string;
  memberPhone: string;
  memberPhoto?: string | null;
  panNumber?: string | null;
  status: string; // PENDING, APPROVED, ACTIVE, EXPIRED, REJECTED
  validFrom: Date | string;
  validTill: Date | string;
  amountPaid: number;
  paymentId?: string | null;
  createdAt: Date | string;
  plan?: any;
}

const globalForStore = globalThis as unknown as {
  __volunteersStore?: StoredVolunteer[];
  __membersStore?: StoredMember[];
};

if (!globalForStore.__volunteersStore) {
  globalForStore.__volunteersStore = [];
}

if (!globalForStore.__membersStore) {
  globalForStore.__membersStore = [];
}

export function saveVolunteerToStore(vol: StoredVolunteer) {
  const existingIdx = globalForStore.__volunteersStore!.findIndex(
    (v) => v.id === vol.id || v.email.toLowerCase() === vol.email.toLowerCase()
  );
  if (existingIdx >= 0) {
    globalForStore.__volunteersStore![existingIdx] = {
      ...globalForStore.__volunteersStore![existingIdx],
      ...vol,
    };
  } else {
    globalForStore.__volunteersStore!.unshift(vol);
  }
}

export function updateVolunteerStatusInStore(volId: string, status: string, notes?: string, hours?: number) {
  const existing = globalForStore.__volunteersStore!.find((v) => v.id === volId);
  if (existing) {
    existing.status = status;
    if (notes !== undefined) existing.verificationNotes = notes;
    if (hours !== undefined) existing.totalHours = hours;
  }
}

export function mergeVolunteers(dbVolunteers: any[]): any[] {
  const map = new Map<string, any>();

  // Add DB volunteers first
  for (const vol of dbVolunteers) {
    map.set(vol.email.toLowerCase(), vol);
  }

  // Merge store volunteers (if not in DB or if store has update)
  for (const vol of globalForStore.__volunteersStore!) {
    const key = vol.email.toLowerCase();
    if (!map.has(key)) {
      map.set(key, vol);
    } else {
      // Merge properties if store has newer status
      const existing = map.get(key);
      map.set(key, { ...existing, ...vol });
    }
  }

  const result = Array.from(map.values());
  result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return result;
}

export function saveMemberToStore(member: StoredMember) {
  const existingIdx = globalForStore.__membersStore!.findIndex(
    (m) => m.id === member.id || m.membershipNo === member.membershipNo || m.memberEmail.toLowerCase() === member.memberEmail.toLowerCase()
  );
  if (existingIdx >= 0) {
    globalForStore.__membersStore![existingIdx] = {
      ...globalForStore.__membersStore![existingIdx],
      ...member,
    };
  } else {
    globalForStore.__membersStore!.unshift(member);
  }
}

export function updateMemberStatusInStore(memberId: string, status: string) {
  const existing = globalForStore.__membersStore!.find((m) => m.id === memberId);
  if (existing) {
    existing.status = status;
  }
}

export function mergeMembers(dbMembers: any[]): any[] {
  const map = new Map<string, any>();

  for (const mem of dbMembers) {
    map.set(mem.memberEmail.toLowerCase(), mem);
  }

  for (const mem of globalForStore.__membersStore!) {
    const key = mem.memberEmail.toLowerCase();
    if (!map.has(key)) {
      map.set(key, mem);
    } else {
      const existing = map.get(key);
      map.set(key, { ...existing, ...mem });
    }
  }

  const result = Array.from(map.values());
  result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return result;
}
