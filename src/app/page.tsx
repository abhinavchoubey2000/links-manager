"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { axiosConfig } from "./axios.config";

interface ResponseDataInterface {
	url: string;
	fullname: string;
	icon_url: string;
	shortname: string;
	id: number;
}
export default function Home() {
	const [name, setName] = useState(""); // State of name of the link
	const [link, setLink] = useState(""); // State of URL of the link
	const [loading, setLoading] = useState(false); // State of Loading
	const [editDialogOpen, setEditDialogOpen] = useState(false); // State of Edit dialog
	const [updatedName, setUpdatedName] = useState(""); // State of Updated name of the link
	const [updatedLink, setUpdatedLink] = useState(""); // State of Updated URL of the link
	const [linksArray, setLinksArray] = useState<Array<ResponseDataInterface>>(
		[]
	); // State of Links Array

	// Function to delete a link
	const deleteLink = async (id: number, fullname: string) => {
		const savedLinkArray = linksArray;
		setLoading(true);
		setLinksArray(linksArray.filter((link) => link.id !== id));
		let undo = false;
		toast.success("Deleted", {
			description: `You have 15 seconds to undo this action.`,
			descriptionClassName: "text-red-500",
			position: "top-right",
			closeButton: true,
			cancelButtonStyle: {
				backgroundColor: "red",
				color: "white",
				border: "none",
				borderRadius: "5px",
				padding: "5px 10px",
				margin: "0 5px",
				cursor: "pointer",
			},
			onDismiss: () => {
				undo = false;
			},
			duration: 15000,
			action: {
				label: "Undo",
				onClick: () => {
					setLinksArray(savedLinkArray);
					undo = true;
					clearTimeout(deletePermanent);
				},
			},
		});
		setLoading(false);

		// Delete the link permanently after 15 seconds
		const deletePermanent = setTimeout(async () => {
			if (!undo) {
				await axiosConfig.delete(`/api/delete-data/${id}`);
				toast.success("Deleted Successfully", {
					description: `Deleted ${fullname}`,
					position: "top-right",
					descriptionClassName: "text-red-500",
					duration: 5000,
				});
			}
			undo = false;
		}, 16000);
	};
	// Function to handle edit inputs of a link
	const handleEdit = (currentName: string, currentLink: string) => {
		setUpdatedName(currentName);
		setUpdatedLink(currentLink);
		setEditDialogOpen(true);
	};
	// Function to edit a link
	const editLink = async (id: number, fullname: string, url: string) => {
		setLoading(true);
		const response = await axiosConfig.put(
			`/api/update-data/`,
			{
				id,
				fullname,
				url,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		toast.success(`Updated to "${updatedName}"`, {
			description: `From "${fullname}"`,
			position: "top-right",
			descriptionClassName: "text-green-500",
			duration: 3000,
		});
		const data: {
			fullname: string;
			id: number;
			url: string;
			shortname: string;
		} = response.data.data;

		const updatedLinksArray = linksArray.map((link) =>
			link.id === id
				? {
						...link,
						fullname: data.fullname,
						url: data.url,
						shortname: data.shortname,
				  }
				: link
		);
		setLinksArray(updatedLinksArray);
		setLoading(false);
	};
	// Function to save a link
	const saveLink = async () => {
		setLoading(true);
		const response = await axiosConfig.post(`/api/add-data`, {
			url: link,
			fullname: name,
		});
		toast.success(`${name}`, {
			description: `Added successfully.`,
			descriptionClassName: "text-green-500",
			position: "top-right",
			duration: 3000,
		});
		const data = response.data;

		setLinksArray([...linksArray, data.data]);
		setName("");
		setLink("");
		setLoading(false);
	};
	// Function to fetch data from the server
	const fetchData = async () => {
		setLoading(true);
		const response = await axiosConfig.get(`/api/get-data`);
		const data = response.data;
		setLinksArray(data.data);
		setLoading(false);
	};

	// Fetch data on component mount
	useEffect(() => {
		fetchData();

		return () => {
			console.log("cleanup");
		};
	}, []);

	return (
		<div className="flex flex-col items-center w-full h-screen">
			<h2 className="scroll-m-20 border-b py-2 text-3xl font-semibold tracking-tight first:mt-0">
				Keep Your Favourite Links Close
			</h2>

			<div className="w-4/5 h-4/5 bg-[#1f1f1f] my-8 rounded-md flex flex-wrap items-center justify-center gap-4">
				{loading ? (
					<Loader className="w-20 h-20 animate-spin" />
				) : (
					<>
						{linksArray.length !== 0
							? linksArray.map((responseData: ResponseDataInterface, index) => {
									return (
										<div
											className="flex flex-row gap-1 justify-center items-center"
											key={index}
										>
											<Link href={responseData.url}>
												<Button
													title={responseData.fullname}
													variant={"secondary"}
													className="flex"
												>
													<Avatar className="h-6 w-6">
														<AvatarImage
															loading="eager"
															src={responseData.icon_url}
														/>
														<AvatarFallback className="flex items-center justify-center">
															<svg
																width="15"
																height="15"
																viewBox="0 0 15 15"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	d="M8.51194 3.00541C9.18829 2.54594 10.0435 2.53694 10.6788 2.95419C10.8231 3.04893 10.9771 3.1993 11.389 3.61119C11.8009 4.02307 11.9513 4.17714 12.046 4.32141C12.4633 4.95675 12.4543 5.81192 11.9948 6.48827C11.8899 6.64264 11.7276 6.80811 11.3006 7.23511L10.6819 7.85383C10.4867 8.04909 10.4867 8.36567 10.6819 8.56093C10.8772 8.7562 11.1938 8.7562 11.389 8.56093L12.0077 7.94221L12.0507 7.89929C12.4203 7.52976 12.6568 7.2933 12.822 7.0502C13.4972 6.05623 13.5321 4.76252 12.8819 3.77248C12.7233 3.53102 12.4922 3.30001 12.1408 2.94871L12.0961 2.90408L12.0515 2.85942C11.7002 2.508 11.4692 2.27689 11.2277 2.11832C10.2377 1.46813 8.94398 1.50299 7.95001 2.17822C7.70691 2.34336 7.47044 2.57991 7.1009 2.94955L7.058 2.99247L6.43928 3.61119C6.24401 3.80645 6.24401 4.12303 6.43928 4.31829C6.63454 4.51355 6.95112 4.51355 7.14638 4.31829L7.7651 3.69957C8.1921 3.27257 8.35757 3.11027 8.51194 3.00541ZM4.31796 7.14672C4.51322 6.95146 4.51322 6.63487 4.31796 6.43961C4.12269 6.24435 3.80611 6.24435 3.61085 6.43961L2.99213 7.05833L2.94922 7.10124C2.57957 7.47077 2.34303 7.70724 2.17788 7.95035C1.50265 8.94432 1.4678 10.238 2.11799 11.2281C2.27656 11.4695 2.50766 11.7005 2.8591 12.0518L2.90374 12.0965L2.94837 12.1411C3.29967 12.4925 3.53068 12.7237 3.77214 12.8822C4.76219 13.5324 6.05589 13.4976 7.04986 12.8223C7.29296 12.6572 7.52943 12.4206 7.89896 12.051L7.89897 12.051L7.94188 12.0081L8.5606 11.3894C8.75586 11.1941 8.75586 10.8775 8.5606 10.6823C8.36533 10.487 8.04875 10.487 7.85349 10.6823L7.23477 11.301C6.80777 11.728 6.6423 11.8903 6.48794 11.9951C5.81158 12.4546 4.95642 12.4636 4.32107 12.0464C4.17681 11.9516 4.02274 11.8012 3.61085 11.3894C3.19896 10.9775 3.0486 10.8234 2.95385 10.6791C2.53661 10.0438 2.54561 9.18863 3.00507 8.51227C3.10993 8.35791 3.27224 8.19244 3.69924 7.76544L4.31796 7.14672ZM9.62172 6.08558C9.81698 5.89032 9.81698 5.57373 9.62172 5.37847C9.42646 5.18321 9.10988 5.18321 8.91461 5.37847L5.37908 8.91401C5.18382 9.10927 5.18382 9.42585 5.37908 9.62111C5.57434 9.81637 5.89092 9.81637 6.08619 9.62111L9.62172 6.08558Z"
																	fill="currentColor"
																	fillRule="evenodd"
																	clipRule="evenodd"
																></path>
															</svg>
														</AvatarFallback>
													</Avatar>
													{responseData.shortname}
												</Button>
											</Link>
											<DropdownMenu modal>
												<DropdownMenuTrigger asChild>
													<Button
														variant={"secondary"}
														className="p-0 bg-transparent shadow-none hover:bg-transparent"
													>
														<svg
															width="15"
															height="15"
															viewBox="0 0 15 15"
															fill="none"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
																d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z"
																fill="currentColor"
																fillRule="evenodd"
																clipRule="evenodd"
															></path>
														</svg>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent>
													<DropdownMenuItem
														onClick={() => {
															deleteLink(
																responseData.id,
																responseData.fullname
															);
														}}
													>
														Delete
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() => {
															handleEdit(
																responseData.fullname,
																responseData.url
															);
														}}
													>
														Edit
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
											<Dialog
												open={editDialogOpen}
												onOpenChange={setEditDialogOpen}
											>
												<DialogContent>
													<DialogHeader>
														<DialogTitle>Update</DialogTitle>
														<DialogDescription>
															Update the name and url of your link.
														</DialogDescription>
													</DialogHeader>
													<div className="flex flex-col gap-4">
														<Input
															className="bg-seconday"
															placeholder="Name"
															value={updatedName}
															onChange={(e) => {
																setUpdatedName(e.target.value);
															}}
														/>
														<Input
															className="bg-seconday"
															placeholder="URL"
															value={updatedLink}
															onChange={(e) => {
																setUpdatedLink(e.target.value);
															}}
														/>
													</div>
													<DialogFooter>
														<DialogClose asChild>
															<Button
																onClick={() => {
																	editLink(
																		responseData.id,
																		updatedName,
																		updatedLink
																	);
																}}
																variant={"default"}
															>
																Update link
															</Button>
														</DialogClose>
													</DialogFooter>
												</DialogContent>
											</Dialog>
										</div>
									);
							  })
							: null}
						<Dialog>
							<DialogTrigger asChild>
								<Button variant={"default"}>
									{" "}
									<svg
										width="15"
										height="15"
										viewBox="0 0 15 15"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
											fill="currentColor"
											fillRule="evenodd"
											clipRule="evenodd"
										></path>
									</svg>
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Add Link</DialogTitle>
									<DialogDescription>
										Add your favourite links along with the name you like with
										its url.
									</DialogDescription>
								</DialogHeader>
								<div className="flex flex-col gap-4">
									<Input
										className="bg-seconday"
										placeholder="Name"
										value={name}
										onChange={(e) => {
											setName(e.target.value);
										}}
									/>
									<Input
										className="bg-seconday"
										placeholder="URL"
										value={link}
										onChange={(e) => {
											setLink(e.target.value);
										}}
									/>
								</div>
								<DialogFooter>
									<DialogClose asChild>
										<Button onClick={saveLink} variant={"default"}>
											Save link
										</Button>
									</DialogClose>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</>
				)}
			</div>
		</div>
	);
}
