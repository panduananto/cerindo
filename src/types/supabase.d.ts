export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      akl: {
        Row: {
          brand_name: string | null
          created_at: string
          date: string | null
          expiry_date: string | null
          file_url: string | null
          id: string
          id_country: string
          id_hscode: string
          packaging: string | null
          updated_at: string | null
        }
        Insert: {
          brand_name?: string | null
          created_at?: string
          date?: string | null
          expiry_date?: string | null
          file_url?: string | null
          id: string
          id_country: string
          id_hscode: string
          packaging?: string | null
          updated_at?: string | null
        }
        Update: {
          brand_name?: string | null
          created_at?: string
          date?: string | null
          expiry_date?: string | null
          file_url?: string | null
          id?: string
          id_country?: string
          id_hscode?: string
          packaging?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "akl_id_country_fkey"
            columns: ["id_country"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "akl_id_hscode_fkey"
            columns: ["id_hscode"]
            isOneToOne: false
            referencedRelation: "hscode"
            referencedColumns: ["id"]
          }
        ]
      }
      akl_items: {
        Row: {
          created_at: string
          description: string | null
          facility: string | null
          id: string
          id_akl: string
          id_country: string
          id_hscode: string
          name: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          facility?: string | null
          id: string
          id_akl: string
          id_country: string
          id_hscode: string
          name?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          facility?: string | null
          id?: string
          id_akl?: string
          id_country?: string
          id_hscode?: string
          name?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "akl_items_id_akl_fkey"
            columns: ["id_akl"]
            isOneToOne: false
            referencedRelation: "akl"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "akl_items_id_country_fkey"
            columns: ["id_country"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "akl_items_id_hscode_fkey"
            columns: ["id_hscode"]
            isOneToOne: false
            referencedRelation: "hscode"
            referencedColumns: ["id"]
          }
        ]
      }
      countries: {
        Row: {
          code: string | null
          created_at: string
          id: string
          name: string | null
          updated_at: string | null
        }
        Insert: {
          code?: string | null
          created_at?: string
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          code?: string | null
          created_at?: string
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      hscode: {
        Row: {
          code: string
          created_at: string
          id: string
          import_dutyfees: number | null
          income_tax_api: number | null
          income_tax_non_api: number | null
          lartas: string | null
          updated_at: string | null
          value_added_tax: number | null
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          import_dutyfees?: number | null
          income_tax_api?: number | null
          income_tax_non_api?: number | null
          lartas?: string | null
          updated_at?: string | null
          value_added_tax?: number | null
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          import_dutyfees?: number | null
          income_tax_api?: number | null
          income_tax_non_api?: number | null
          lartas?: string | null
          updated_at?: string | null
          value_added_tax?: number | null
        }
        Relationships: []
      }
      importers: {
        Row: {
          company_address: string
          company_name: string
          company_phone: string
          created_at: string
          id: string
          npwp: string
          official_name: string
          official_title: string
          updated_at: string | null
        }
        Insert: {
          company_address: string
          company_name: string
          company_phone: string
          created_at?: string
          id?: string
          npwp: string
          official_name: string
          official_title: string
          updated_at?: string | null
        }
        Update: {
          company_address?: string
          company_name?: string
          company_phone?: string
          created_at?: string
          id?: string
          npwp?: string
          official_name?: string
          official_title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          first_name: string
          full_name: string | null
          id: string
          last_name: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          first_name: string
          full_name?: string | null
          id: string
          last_name: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          first_name?: string
          full_name?: string | null
          id?: string
          last_name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
