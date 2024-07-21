import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { firestore, storage } from "../services/firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
const Requested = () => {
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [responseText, setResponseText] = useState('');
    const [responseImage, setResponseImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                console.log("Fetching requests...");
                const q = query(collection(firestore, 'requests'), where('status', '==', 'Pending'));
                const querySnapshot = await getDocs(q);
                if (querySnapshot.empty) {
                    console.log("No pending requests found.");
                }
                const requestsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                console.log("Requests fetched:", requestsData);
                console.log("Rendering requests:", requests);

                setRequests(requestsData);
            } catch (err) {
                console.error("Error fetching requests: ", err);
                setError("Failed to fetch requests.");
            }
        };

        fetchRequests();
    }, []);

    const handleSelectRequest = (request) => {
        setSelectedRequest(request);
    };

    const handleApprove = async () => {
        if (!selectedRequest) return;

        setLoading(true);
        try {
            let imageUrl = '';

            if (responseImage) {
                const imageRef = ref(storage, `responses/${selectedRequest.id}/${responseImage.name}`);
                await uploadBytes(imageRef, responseImage);
                imageUrl = await getDownloadURL(imageRef);
            }

            await updateDoc(doc(firestore, 'requests', selectedRequest.id), {
                status: 'Approved',
                responseText: responseText,
                responseImage: imageUrl,
                responseTimestamp: new Date()
            });

            setRequests(prevRequests => prevRequests.map(request =>
                request.id === selectedRequest.id
                    ? { ...request, status: 'Approved', responseText, responseImage: imageUrl }
                    : request
            ));
            setSelectedRequest(null);
            setResponseText('');
            setResponseImage(null);
        } catch (error) {
            console.error("Error approving request: ", error);
            setError("Failed to approve request.");
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async () => {
        if (!selectedRequest) return;

        setLoading(true);
        try {
            await updateDoc(doc(firestore, 'requests', selectedRequest.id), {
                status: 'Rejected',
                responseText: 'Your request has been rejected.',
                responseTimestamp: new Date()
            });

            setRequests(prevRequests => prevRequests.map(request =>
                request.id === selectedRequest.id
                    ? { ...request, status: 'Rejected', responseText: 'Your request has been rejected.' }
                    : request
            ));
            setSelectedRequest(null);
            setResponseText('');
            setResponseImage(null);
        } catch (error) {
            console.error("Error rejecting request: ", error);
            setError("Failed to reject request.");
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setResponseImage(e.target.files[0]);
        }
    };

    return (
        <div>
            <h1>Pending Requests</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {requests.map(request => (
                    <li key={request.id}>
                        <div>
                            <h2>{request.email}</h2>
                            <p>{request.name}</p>
                            <p>{request.request}</p>
                            <p>{request.request_id}</p>
                            <button onClick={() => handleSelectRequest(request)}>Select</button>
                        </div>
                    </li>
                ))}
            </ul>

            {selectedRequest && (
                <div>
                    <h2>Respond to Request</h2>
                    <textarea
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        placeholder="Enter response text"
                    />
                    <input type="file" onChange={handleImageChange} />
                    <button onClick={handleApprove} disabled={loading}>
                        Approve
                    </button>
                    <button onClick={handleReject} disabled={loading}>
                        Reject
                    </button>
                </div>
            )}
        </div>
    );
};

export default Requested;