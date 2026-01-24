'use client';
import { useState, useEffect } from "react";
import { tablesDB, Query, ID } from "@/config/appwrite";
import { useAuth } from "@/context/Authcontext";

const db = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const cll = process.env.NEXT_PUBLIC_APPWRITE_USERS_ID;

export function useUserdata() {
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    userId: "",
  });
  const [docId, setDocId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch user data
  useEffect(() => {
    if (!user || !user.email) return;

    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await tablesDB.listRows({
          databaseId: db,
          tableId: cll,
          queries: [
            Query.equal("userId", user.$id),
          ]
        });

        if (response.total > 0) {
          const doc = response.rows[0];
          setDocId(doc.$id);
          setUserData({
            name: doc.name || "",
            email: doc.email || "",
            phone: doc.phone || "",
            userId: doc.userId || "",
          });
        } else {
          // Initialize with user data if no document exists
          setUserData({
            name: user.name || "",
            email: user.email,
            phone: "",
            userId: user.$id,
          });
        }
      } catch (err) {
        console.error("Error fetching user data", err);
        setError("Error occurs while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  // Update user data
  const updateUserData = async (newData) => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const payload = {
        ...userData,
        ...newData,
        userId: user.$id,
      };

      if (docId) {
        // Update existing document
        await tablesDB.updateRow({
          databaseId: db,
          tableId: cll,
          rowId: docId,
          data: payload
        });
      } else {
        // Create new document
        const result = await tablesDB.createRow({
          databaseId: db,
          tableId: cll,
          documentId: ID.unique(),
          data: payload
        });
        setDocId(result.$id);
      }

      // Update local state
      setUserData(payload);
      setSuccess("Saved successfully");
      return true;
    } catch (err) {
      console.error("Error saving user data", err);
      setError("Something went wrong while saving");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Save user data (with validation)
  const saveUserData = async () => {
    if (!userData.phone) {
      setError("Please enter your phone number");
      return false;
    }
    
    return await updateUserData(userData);
  };

  // Update specific field
  const updateField = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Reset messages
  const resetMessages = () => {
    setError("");
    setSuccess("");
  };

  return {
    userData,
    setUserData,
    updateField,
    saveUserData,
    updateUserData,
    loading,
    error,
    success,
    resetMessages,
    docId,
  };
}